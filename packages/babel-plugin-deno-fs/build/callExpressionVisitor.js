"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callExpressionVisitor = void 0;
const babel_helper_deno_general_1 = require("babel-helper-deno-general");
const core_1 = require("@babel/core");
const debug_1 = require("./util/debug");
function callExpressionVisitor(path) {
    const { node } = path;
    // ex. could be ArrowFunctionExpression etc. Ensure it's not
    if (node.callee.type !== 'MemberExpression')
        return;
    const apiCall = new babel_helper_deno_general_1.ApiCall(node);
    const mod = new babel_helper_deno_general_1.Mod(node);
    /**
     * fs.chmodSync(path, mode)
     */
    if (apiCall.is('fs.chmodSync')) {
        const pathArg = apiCall.getAstOfArgNumber(1);
        const mode = apiCall.getAstOfArgNumber(2);
        if (mode) {
            const log = "fs.chmodSync: 'mode' arg not supported. adding unsafe placeholder";
            babel_helper_deno_general_1.warn(debug_1.debug, log);
        }
        const placeholder = core_1.types.numericLiteral(0o666);
        const astArgs = [];
        if (pathArg)
            astArgs.push(pathArg);
        if (placeholder)
            astArgs.push(placeholder);
        path.replaceWith(babel_helper_deno_general_1.callExpressionFactoryAst('Deno.chmodSync', astArgs));
    }
    else if (apiCall.is('fs.chownSync')) {
        /**
         * fs.chownSync(path, uid, gid)
         * doesn't support path being Buffer or URL
         */
        const args = apiCall.getAstOfAllArgs();
        path.replaceWith(babel_helper_deno_general_1.callExpressionFactoryAst('Deno.chownSync', args));
    }
    else if (apiCall.is('fs.closeSync')) {
        /**
         * fs.closeSync(fd)
         */
        const fd = apiCall.getAstOfArgNumber(1);
        if (fd) {
            path.replaceWith(babel_helper_deno_general_1.callExpressionFactoryAst('Deno.closeSync', [fd]));
        }
        else {
            path.replaceWith(babel_helper_deno_general_1.callExpressionFactoryAst('Deno.closeSync', []));
        }
    }
    else if (apiCall.is('fs.copyFileSync')) {
        /**
         * fs.copyFileSync(src, dest[, mode])
         */
        const src = apiCall.getAstOfArgNumber(1);
        const dest = apiCall.getAstOfArgNumber(2);
        const mode = apiCall.getAstOfArgNumber(3);
        if (mode) {
            const log = 'fs.copyFileSync: mode argument not supported.';
            babel_helper_deno_general_1.warn(debug_1.debug, log);
        }
        path.replaceWith(babel_helper_deno_general_1.callExpressionFactoryAst('Deno.copyFileSync', [src, dest]));
    }
    else if (apiCall.is('fs.existsSync')) {
        /**
         * fs.existsSync(path)
         */
        const pathArg = apiCall.getAstOfArgNumber(1);
        // @ts-ignore
        mod.ensureStdImport(this.denoImports, 'denoFs', 'fs');
        path.replaceWith(babel_helper_deno_general_1.callExpressionFactoryAst('denoFs.existsSync', [pathArg]));
    }
    else if (apiCall.is('fs.mkdirSync')) {
        /**
         * fs.mkdirSync(path[, options])
         */
        // arguments and options the same as deno
        const args = apiCall.getAstOfAllArgs();
        path.replaceWith(babel_helper_deno_general_1.callExpressionFactoryAst('Deno.mkdirSync', args));
    }
    else if (apiCall.is('fs.mkdtempSync')) {
        /**
         * fs.mkdtempSync(prefix[, options])
         */
        const prefix = apiCall.getAstOfArgNumber(1);
        const objectMethodProperties = [];
        if (prefix) {
            objectMethodProperties.push(
            // @ts-ignore
            core_1.types.objectProperty(core_1.types.stringLiteral('prefix'), prefix));
        }
        const denoOpts = core_1.types.objectExpression(objectMethodProperties);
        if (Object.keys(denoOpts).length === 0) {
            path.replaceWith(babel_helper_deno_general_1.callExpressionFactoryAst('Deno.makeTempDirSync'));
        }
        else {
            path.replaceWith(babel_helper_deno_general_1.callExpressionFactoryAst('Deno.makeTempDirSync', [denoOpts]));
        }
    }
}
exports.callExpressionVisitor = callExpressionVisitor;
//# sourceMappingURL=callExpressionVisitor.js.map