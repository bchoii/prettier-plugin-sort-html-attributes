import * as prettierPluginTypeScript from "prettier/plugins/typescript";

function sortAttributes(node: any): void {
  if (!node || typeof node !== "object") return;

  // For JSX (node.openingElement.attributes)
  if (node.type === "JSXElement" && node.openingElement?.attributes) {
    node.openingElement.attributes.sort((a: any, b: any) => {
      const nameA = a.name?.name ?? "";
      const nameB = b.name?.name ?? "";
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
  typescript: tsxParser,
};
