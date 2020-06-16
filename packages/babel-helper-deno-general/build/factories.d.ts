import { types as t } from '@babel/core';
import { SpreadElement, JSXNamespacedName, ArgumentPlaceholder, Expression } from 'bt';
import type { PrimitiveLike } from 't';
/**
 * factory functions to be called by plugins to
 * create asts
 */
/**
 * create a call expression factory from raw primitives
 */
export declare function callExpressionFactory(methodChainString: string, callParameters: Array<PrimitiveLike>): t.CallExpression;
/**
 * @desc convert method chain 'thing.two()' to ast representation
 */
export declare function callExpressionFactoryAst(methodChainString: string, callParameters?: Array<Expression | SpreadElement | JSXNamespacedName | ArgumentPlaceholder>): t.CallExpression;
//# sourceMappingURL=factories.d.ts.map