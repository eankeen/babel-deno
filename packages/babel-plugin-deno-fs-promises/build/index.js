"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helper_plugin_utils_1 = require("@babel/helper-plugin-utils");
const importDeclarationVisitor_1 = require("./importDeclarationVisitor");
const callExpressionVisitor_1 = require("./callExpressionVisitor");
exports.default = helper_plugin_utils_1.declare((api, options) => {
    api.assertVersion(7);
    return {
        name: 'babel-plugin-deno-fs-promises',
        visitor: {
            ImportDeclaration: (path) => importDeclarationVisitor_1.importDeclarationVisitor(path),
            CallExpression: (path) => callExpressionVisitor_1.callExpressionVisitor(path),
        },
    };
});
//# sourceMappingURL=index.js.map