import * as prettierPluginTypeScript from 'prettier/plugins/typescript';
import * as htmlPlugin from 'prettier/plugins/html';
import { doc } from 'prettier';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var _a = doc.builders; _a.join; _a.line; _a.ifBreak; _a.group;
var sortOrder = ["key", "id", "className", "style", "onClick"].toReversed();
function sortAttributes(node) {
    var _a;
    if (!node || typeof node !== "object")
        return;
    // For HTML (node.attrs)
    if (Array.isArray(node.attrs)) {
        node.attrs.sort(function (a, b) { return (a.name > b.name ? 1 : -1); });
    }
    // For JSX (node.openingElement.attributes)
    if (node.type === "JSXElement" && ((_a = node.openingElement) === null || _a === void 0 ? void 0 : _a.attributes)) {
        node.openingElement.attributes.sort(function (a, b) {
            var _a = [a, b].map(function (_) { var _a, _b; return (_b = (_a = _.name) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : ""; }), nameA = _a[0], nameB = _a[1];
            var _b = [nameA, nameB].map(function (name) {
                return sortOrder.indexOf(name);
            }), indexA = _b[0], indexB = _b[1];
            if (indexA != indexB)
                return indexB - indexA;
            return nameA.localeCompare(nameB);
        });
    }
    // Recursively apply to children
    for (var key in node) {
        var child = node[key];
        if (Array.isArray(child)) {
            child.forEach(sortAttributes);
        }
        else if (typeof child === "object") {
            sortAttributes(child);
        }
    }
}
// Override HTML parser
__assign(__assign({}, htmlPlugin.parsers.html), { parse: function (text, parsers, options) {
        console.log("htmlParser");
        var ast = htmlPlugin.parsers.html.parse(text, options);
        sortAttributes(ast);
        return ast;
    } });
// Override Typescript parser
var tsxParser = __assign(__assign({}, prettierPluginTypeScript.parsers.typescript), { parse: function (text, options) {
        var ast = prettierPluginTypeScript.parsers.typescript.parse(text, options);
        sortAttributes(ast);
        return ast;
    } });
var parsers = {
    // html: htmlParser,
    typescript: tsxParser,
};

export { parsers };
//# sourceMappingURL=index.js.map
