"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helper_plugin_utils_1 = require("@babel/helper-plugin-utils");
const importDeclarationVisitor_1 = require("./importDeclarationVisitor");
const callExpressionVisitor_1 = require("./callExpressionVisitor");
const programExitVisitor_1 = require("./programExitVisitor");
exports.default = helper_plugin_utils_1.declare((api, options) => {
    api.assertVersion(7);
    return {
        name: 'babel-plugin-deno-fs-promises',
        pre(state) {
            // TODO: remove need for ts ignores
            // @ts-ignore
            this.denoImports = new Set();
        },
        visitor: {
            Program: {
                exit(path) {
                    return programExitVisitor_1.programExitVisitor.call(this, path);
                },
            },
            ImportDeclaration(path) {
                return importDeclarationVisitor_1.importDeclarationVisitor.call(this, path);
            },
            CallExpression(path) {
                return callExpressionVisitor_1.callExpressionVisitor.call(this, path);
            },
        },
    };
});
//# sourceMappingURL=index.js.map