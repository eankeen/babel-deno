"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callExpressionFactoryAst = exports.callExpressionFactory = void 0;
const core_1 = require("@babel/core");
const converters_1 = require("./converters");
const util_1 = require("./util");
const debug_1 = require("./util/debug");
/**
 * factory functions to be called by plugins to
 * create asts
 */
/**
 * create a call expression factory from raw primitives
 */
function callExpressionFactory(methodChainString, callParameters) {
    debug_1.debug('callExpressionFactoryArgs: %c, %O', methodChainString, callParameters);
    const methodChainArray = methodChainString.split('.');
    // create the nestedMemberExpression
    // ex. identifier.MemberExpression.MemberExpression(param1, param2, myObject)
    let nestedMemberExpression = core_1.types.identifier(methodChainArray.shift());
    for (const identifier of methodChainArray) {
        nestedMemberExpression = core_1.types.memberExpression(nestedMemberExpression, core_1.types.identifier(identifier));
    }
    if (!util_1.isLastParameterObject(callParameters)) {
        const astCallParameters = converters_1.toAstCallExpressionArguments(callParameters);
        return core_1.types.callExpression(nestedMemberExpression, astCallParameters);
    }
    else {
        const methodOptions = callParameters.pop();
        const astCallParameters = converters_1.toAstCallExpressionArguments(callParameters);
        // if passed object is empty, then we create the call expression with the empty
        if (Object.keys(methodOptions).length === 0) {
            return core_1.types.callExpression(nestedMemberExpression, [
                ...astCallParameters,
                core_1.types.objectExpression([]),
            ]);
        }
        const astObjectLiteral = toAstObjectLiteral(methodOptions);
        return core_1.types.callExpression(nestedMemberExpression, [
            ...astCallParameters,
            astObjectLiteral,
        ]);
    }
}
exports.callExpressionFactory = callExpressionFactory;
/**
 * @desc convert method chain 'thing.two()' to ast representation
 */
function callExpressionFactoryAst(methodChainString, callParameters) {
    const methodChainArray = methodChainString.split('.');
    // create the nestedMemberExpression
    // ex. identifier.MemberExpression.MemberExpression(param1, param2, myObject)
    let nestedMemberExpression = core_1.types.identifier(methodChainArray.shift());
    for (const identifier of methodChainArray) {
        nestedMemberExpression = core_1.types.memberExpression(nestedMemberExpression, core_1.types.identifier(identifier));
    }
    if (callParameters) {
        return core_1.types.callExpression(nestedMemberExpression, callParameters);
    }
    else {
        return core_1.types.callExpression(nestedMemberExpression, []);
    }
}
exports.callExpressionFactoryAst = callExpressionFactoryAst;
/**
 * @description converts an object {a: 'b', c: 'd'} to ast representation
 */
function toAstObjectLiteral(objectLiteral) {
    const objectExpressionProperties = [];
    for (const key in objectLiteral) {
        const rawValue = objectLiteral[key];
        objectExpressionProperties.push(core_1.types.objectProperty(core_1.types.identifier(key), converters_1.astFromPrimitive(rawValue)));
    }
    return core_1.types.objectExpression(objectExpressionProperties);
}
//# sourceMappingURL=factories.js.map