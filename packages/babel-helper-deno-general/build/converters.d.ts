import { types as t } from '@babel/core';
import type { Expression } from 'bt';
import type { Primitive, PrimitiveLike } from 't';
/**
 * all these functions convert babel ast to more primitive values
 * or visa versa. similar to 'factories', but more lower level
 */
/**
 * input primitive value (except)
 */
export declare function astFromPrimitive(rawValue: Primitive): t.StringLiteral | t.NumericLiteral | t.NullLiteral | t.BooleanLiteral | t.RegExpLiteral | t.UnaryExpression | t.BigIntLiteral;
export declare function primitiveFromAst(ast: any): Primitive;
/**
 * @description converts an array [1, 4, 9] to ast representation, used most directly for
 * callExpression 'arguments' option
 */
export declare function toAstCallExpressionArguments(args: Array<PrimitiveLike>): Array<Expression>;
//# sourceMappingURL=converters.d.ts.map