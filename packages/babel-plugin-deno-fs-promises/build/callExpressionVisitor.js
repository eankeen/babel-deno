"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callExpressionVisitor = void 0;
const babel_helper_deno_general_1 = require("babel-helper-deno-general");
const debug_1 = require("./util/debug");
function callExpressionVisitor(path) {
    const { node } = path;
    // ex. could be ArrowFunctionExpression etc. Ensure it's not
    if (node.callee.type !== 'MemberExpression')
        return;
    const apiCall = new babel_helper_deno_general_1.ApiCall(node);
    if (apiCall.is('fs.promises.readFile')) {
        // TODO: remove this duplicated type
        const args = [];
        if (!apiCall.argNumHasType(1, String)) {
            throw new Error('first param has to be string');
        }
        args.push(apiCall.getAstOfArgNumber(1));
        if (apiCall.hasKeyInObjectArg('encoding')) {
            path.replaceWith(babel_helper_deno_general_1.callExpressionFactoryAst('Deno.readTextFile', args));
        }
        else {
            path.replaceWith(babel_helper_deno_general_1.callExpressionFactoryAst('Deno.readFile', args));
        }
    }
    else if (apiCall.is('fs.promises.chmod')) {
        const args = apiCall.getAstOfAllArgs();
        path.replaceWith(babel_helper_deno_general_1.callExpressionFactoryAst('Deno.chmod', args));
    }
    else if (apiCall.is('fs.promises.chown')) {
        const args = apiCall.getAstOfAllArgs();
        path.replaceWith(babel_helper_deno_general_1.callExpressionFactoryAst('Deno.chown', args));
    }
    else if (apiCall.is('fs.promises.copyFile')) {
        const src = apiCall.getAstOfArgNumber(1);
        const dest = apiCall.getAstOfArgNumber(2);
        const modeOptional = apiCall.getAstOfArgNumber(3);
        if (modeOptional) {
            debug_1.debug('mode option for fs.promises.copyFile not supported');
        }
        path.replaceWith(babel_helper_deno_general_1.callExpressionFactoryAst('Deno.copyFile', [src, dest]));
    }
    else if (apiCall.is('fs.promises.mkdir')) {
        const args = apiCall.getAstOfAllArgs();
        path.replaceWith(babel_helper_deno_general_1.callExpressionFactoryAst('Deno.mkdir', args));
    }
}
exports.callExpressionVisitor = callExpressionVisitor;
//# sourceMappingURL=callExpressionVisitor.js.map