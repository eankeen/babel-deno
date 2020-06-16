"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const importDeclarationVisitor_1 = require("./importDeclarationVisitor");
const callExpressionVisitor_1 = require("./callExpressionVisitor");
function declare(api, options) {
    api.assertVersion(7);
    return {
        name: 'babel-plugin-deno-fs-promises',
        visitor: {
            ImportDeclaration: (path) => importDeclarationVisitor_1.importDeclarationVisitor(path),
            CallExpression: (path) => callExpressionVisitor_1.callExpressionVisitor(path),
        },
    };
}
exports.default = declare;
//# sourceMappingURL=index.js.map