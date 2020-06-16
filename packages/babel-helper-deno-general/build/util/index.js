"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLastAstParameterObject = exports.isLastParameterObject = void 0;
function isLastParameterObject(args) {
    const lastParam = args[args.length - 1];
    return typeof lastParam === 'object' && !Array.isArray(lastParam);
}
exports.isLastParameterObject = isLastParameterObject;
/**
 * TODO: fix check, this doesn't actually work
 */
function isLastAstParameterObject(args) {
    const lastParam = args[args.length - 1];
    return typeof lastParam === 'object' && !Array.isArray(lastParam);
}
exports.isLastAstParameterObject = isLastAstParameterObject;
//# sourceMappingURL=index.js.map