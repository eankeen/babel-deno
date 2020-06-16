import { SpreadElement, JSXNamespacedName, ArgumentPlaceholder, Expression, CallExpression } from 'bt';
import type { PrimitiveLike } from 't';
export declare type argAst = Expression | SpreadElement | JSXNamespacedName | ArgumentPlaceholder;
declare type argTypeOptions = StringConstructor | NumberConstructor | BooleanConstructor;
declare type argNumbers = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
/**
 * An ApiCall is essentially a CallExpression, with the calle being nested
 * MemberExpressions up to an Identifier
 */
export declare class ApiCall {
    #private;
    constructor(node: CallExpression);
    /**
     * @desc returns true if two api calls have the same callee
     * on their CallExpression
     */
    is(comparison: string): boolean;
    /**
     * @desc converts the babel ast to actual params we can read and do tests on
     */
    argNumHasType(argNumber: argNumbers, argType: argTypeOptions): boolean;
    hasObjectArg(): boolean;
    getAstOfArgNumber(argNumber: argNumbers): argAst;
    getArgNumber(argNumber: argNumbers): PrimitiveLike;
    getAstOfAllArgs(): Array<argAst>;
    hasNumberOfArgs(argNumber: argNumbers): boolean;
    hasKeyInObjectArg(keyname: string): boolean;
}
/**
 *
 * @desc this flattens the 'likeMemberExpressionChain' i.e. the nested
 * MemberExpressions (nested in the first parameter) including the Identifier at the
 * end of the chain
 * @params {MemberExpression}
 */
export declare function createCalleeNice(parentMemberExpression: any): Array<string>;
export {};
//# sourceMappingURL=ApiCall.d.ts.map