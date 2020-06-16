"use strict";
// import { callExpressionFactoryAst, ApiCall,
// ApiPropertyAccessor } from 'babel-helper-deno-general';
// import type {
//   Expression, SpreadElement, JSXNamespacedName, ArgumentPlaceholder,
// } from 'bt';
// import { debug } from './util/debug';
Object.defineProperty(exports, "__esModule", { value: true });
exports.callExpressionVisitor = void 0;
function callExpressionVisitor(path) {
    const { node } = path;
    //   // ex. could be ArrowFunctionExpression etc. Ensure it's not
    //   if (node.callee.type !== 'MemberExpression') return;
    //   const methodCall = new ApiPropertyAccessor(node)
    //   /**
    //    * right now we don't support assignments
    //    */
    //   if (methodCall.includes('process.env')) {
    //     const args = methodCall.getAstOfAllArgs();
    //     path.replaceWith(
    //       callExpressionFactoryAst('Deno.chmodSync', args),
    //     );
    //   }
}
exports.callExpressionVisitor = callExpressionVisitor;
//# sourceMappingURL=callExpressionVisitor.js.map