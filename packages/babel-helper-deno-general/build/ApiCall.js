"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _calleeNice, _arguments;
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCalleeNice = exports.ApiCall = void 0;
const converters_1 = require("./converters");
const debug_1 = require("./util/debug");
const util_1 = require("./util");
/**
 * An ApiCall is essentially a CallExpression, with the calle being nested
 * MemberExpressions up to an Identifier
 */
class ApiCall {
    constructor(node) {
        /**
         * Nice (easy to handle) representation of a CallExpression's callee. This is limited
         * to nested MemberExpressions (and Identifier) though, we can't handle any CallExpression's
         * within the nest
         */
        _calleeNice.set(this, void 0);
        /**
         * This isn't 'argumentsNice' like 'calleeNice' is because the
         * CallExpression.arguments structure isn't nested and it's easier
         * to deal with
         */
        _arguments.set(this, void 0);
        __classPrivateFieldSet(this, _calleeNice, createCalleeNice(node.callee));
        __classPrivateFieldSet(this, _arguments, node.arguments);
    }
    /**
     * @desc returns true if two api calls have the same callee
     * on their CallExpression
     */
    is(comparison) {
        const doesMatch = __classPrivateFieldGet(this, _calleeNice).join('.') === comparison;
        return doesMatch;
    }
    /**
     * @desc converts the babel ast to actual params we can read and do tests on
     */
    argNumHasType(argNumber, argType) {
        const node = __classPrivateFieldGet(this, _arguments)[argNumber - 1];
        if (node.type === 'StringLiteral' && argType === String)
            return true;
        else if (node.type === 'NumericLiteral' && argType === Number)
            return true;
        else if (node.type === 'BooleanLiteral' && argType === Boolean)
            return true;
        else {
            throw new Error('could not decipher this');
        }
    }
    hasObjectArg() {
        return util_1.isLastAstParameterObject(__classPrivateFieldGet(this, _arguments));
    }
    getAstOfArgNumber(argNumber) {
        return __classPrivateFieldGet(this, _arguments)[argNumber - 1];
    }
    getArgNumber(argNumber) {
        const ast = this.getAstOfArgNumber(argNumber);
        const value = converters_1.primitiveFromAst(ast);
        return value;
    }
    getAstOfAllArgs() {
        return __classPrivateFieldGet(this, _arguments);
    }
    hasNumberOfArgs(argNumber) {
        // both .length and argNumber start from 1
        return __classPrivateFieldGet(this, _arguments).length >= argNumber;
    }
    hasKeyInObjectArg(keyname) {
        if (!this.hasObjectArg())
            return false;
        const objectExpression = __classPrivateFieldGet(this, _arguments)[__classPrivateFieldGet(this, _arguments).length - 1];
        for (const likeObjectProperty of objectExpression.properties) {
            // SpreadElement doesn't contain property key
            if (likeObjectProperty.type === 'SpreadElement')
                continue;
            if (likeObjectProperty.key.name === keyname)
                return true;
        }
        return false;
    }
}
exports.ApiCall = ApiCall;
_calleeNice = new WeakMap(), _arguments = new WeakMap();
/**
 *
 * @desc this flattens the 'likeMemberExpressionChain' i.e. the nested
 * MemberExpressions (nested in the first parameter) including the Identifier at the
 * end of the chain
 * @params {MemberExpression}
 */
function createCalleeNice(parentMemberExpression) {
    // this really is an array of 'properties' of those memberExpression
    const memberExpressionArray = [];
    const walkUp = (currentParentMemberExpression) => {
        if (currentParentMemberExpression.property.type !== 'Identifier') {
            debug_1.debug('we cant deal with non identifiers. found %s', currentParentMemberExpression.property.type);
            throw new Error(`non identifier detected. found ${currentParentMemberExpression.property.type}`);
        }
        // yes, this adds them in reverse order. we reverse the whole array at the end
        memberExpressionArray.push(currentParentMemberExpression.property.name);
        if (currentParentMemberExpression.object.type !== 'MemberExpression' &&
            currentParentMemberExpression.object.type !== 'Identifier') {
            debug_1.debug("this isn't an (api (if it is a node api at all)) that we can transform: %O", currentParentMemberExpression);
            return;
        }
        // if we've reached an identifier, we know we are at the end of the chain
        // stop the walk
        if (currentParentMemberExpression.object.type === 'Identifier') {
            memberExpressionArray.push(currentParentMemberExpression.object.name);
            memberExpressionArray.reverse();
            return;
        }
        walkUp(currentParentMemberExpression.object);
    };
    walkUp(parentMemberExpression);
    return memberExpressionArray;
}
exports.createCalleeNice = createCalleeNice;
//# sourceMappingURL=ApiCall.js.map