"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toAstCallExpressionArguments = exports.primitiveFromAst = exports.astFromPrimitive = void 0;
const core_1 = require("@babel/core");
const generator_1 = __importDefault(require("@babel/generator"));
const log_1 = require("./log");
const debug_1 = require("./util/debug");
/**
 * all these functions convert babel ast to more primitive values
 * or visa versa. similar to 'factories', but more lower level
 */
/**
 * input primitive value (except)
 */
function astFromPrimitive(rawValue) {
    let value;
    if (typeof rawValue === 'string')
        value = core_1.types.stringLiteral(rawValue);
    else if (typeof rawValue === 'bigint') {
        value = core_1.types.bigIntLiteral(rawValue.toString());
    }
    else if (typeof rawValue === 'boolean')
        value = core_1.types.booleanLiteral(rawValue);
    else if (typeof rawValue === 'undefined') {
        value = core_1.types.unaryExpression('void', core_1.types.numericLiteral(0), true);
    }
    else if (rawValue === null)
        value = core_1.types.nullLiteral();
    else if (typeof rawValue === 'number')
        value = core_1.types.numericLiteral(rawValue);
    else if (rawValue instanceof RegExp) {
        value = core_1.types.regExpLiteral(rawValue.toString());
    }
    else {
        throw new Error(`getAstFromPrimitive: unexpected rawValue: ${rawValue}`);
    }
    return value;
}
exports.astFromPrimitive = astFromPrimitive;
function primitiveFromAst(ast) {
    let value;
    if (core_1.types.isStringLiteral(ast) ||
        core_1.types.isNumericLiteral(ast) ||
        core_1.types.isBigIntLiteral(ast) ||
        core_1.types.isBooleanLiteral(ast)) {
        return ast.value;
    }
    else if (core_1.types.isNullLiteral(ast)) {
        return null;
    }
    else if (core_1.types.isObjectExpression(ast)) {
        const generatorResult = generator_1.default(ast);
        return JSON.parse(generatorResult.code);
    }
    else if (core_1.types.isRegExpLiteral(ast)) {
        return ast.pattern;
    }
    else if (core_1.types.isUnaryExpression(ast) &&
        ast.operator === 'void' &&
        core_1.types.isNumericLiteral(ast.argument) &&
        ast.argument.value === 0) {
        return undefined;
    }
    else if (core_1.types.isIdentifier(ast)) {
        return ast.name;
    }
    log_1.error(debug_1.debug, 'unexpected value in primitiveFromAst: %O', ast);
    return undefined;
}
exports.primitiveFromAst = primitiveFromAst;
/**
 * @description converts an array [1, 4, 9] to ast representation, used most directly for
 * callExpression 'arguments' option
 */
function toAstCallExpressionArguments(args) {
    const astCallParameters = [];
    for (const callParameter in args) {
        astCallParameters.push(astFromPrimitive(callParameter));
    }
    return astCallParameters;
}
exports.toAstCallExpressionArguments = toAstCallExpressionArguments;
//# sourceMappingURL=converters.js.map