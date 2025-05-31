import * as prettierPluginTypeScript from "prettier/plugins/typescript";
import * as htmlPlugin from "prettier/plugins/html";
import { doc } from "prettier";
const { join, line, ifBreak, group } = doc.builders;

const sortOrder = ["key", "id", "className", "style", "onClick"].toReversed();

function sortAttributes(node: any): void {
  if (!node || typeof node !== "object") return;

  // For HTML (node.attrs)
  if (Array.isArray(node.attrs)) {
    node.attrs.sort((a, b) => (a.name > b.name ? 1 : -1));
  }

  // For JSX (node.openingElement.attributes)
  if (node.type === "JSXElement" && node.openingElement?.attributes) {
    node.openingElement.attributes.sort((a: any, b: any) => {
      const [nameA, nameB] = [a, b].map((_) => _.name?.name ?? "");
      const [indexA, indexB] = [nameA, nameB].map((name) =>
        sortOrder.indexOf(name)
      );
      if (indexA != indexB) return indexB - indexA;
      return nameA.localeCompare(nameB);
    });
  }

  // Recursively apply to children
  for (const key in node) {
    const child = node[key];
    if (Array.isArray(child)) {
      child.forEach(sortAttributes);
    } else if (typeof child === "object") {
      sortAttributes(child);
    }
  }
}

// Override HTML parser
const htmlParser = {
  ...htmlPlugin.parsers.html,
  parse: (text: string, parsers: any, options: any) => {
    console.log("htmlParser");
    const ast = htmlPlugin.parsers.html.parse(text, options);
    sortAttributes(ast);
    return ast;
  },
};

// Override Typescript parser
const tsxParser = {
  ...prettierPluginTypeScript.parsers.typescript,
  parse: (text: string, options: any) => {
    const ast = prettierPluginTypeScript.parsers.typescript.parse(
      text,
      options
    );
    sortAttributes(ast);
    return ast;
  },
};

export const parsers = {
  // html: htmlParser,
  typescript: tsxParser,
};
