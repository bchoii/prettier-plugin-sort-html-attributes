import * as prettierPluginTypeScript from 'prettier/plugins/typescript';

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

function sortAttributes(node) {
    var _a;
    if (!node || typeof node !== "object")
        return;
    // For JSX (node.openingElement.attributes)
    if (node.type === "JSXElement" && ((_a = node.openingElement) === null || _a === void 0 ? void 0 : _a.attributes)) {
        node.openingElement.attributes.sort(function (a, b) {
            var _a, _b, _c, _d;
            var nameA = (_b = (_a = a.name) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : "";
            var nameB = (_d = (_c = b.name) === null || _c === void 0 ? void 0 : _c.name) !== null && _d !== void 0 ? _d : "";
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
// Override Typescript parser
var tsxParser = __assign(__assign({}, prettierPluginTypeScript.parsers.typescript), { parse: function (text, options) {
        var ast = prettierPluginTypeScript.parsers.typescript.parse(text, options);
        sortAttributes(ast);
        return ast;
    } });
var parsers = {
    typescript: tsxParser,
};

export { parsers };
//# sourceMappingURL=index.js.map
