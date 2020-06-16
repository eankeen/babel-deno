"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.importDeclarationVisitor = void 0;
function importDeclarationVisitor(path) {
    const { node } = path;
    const { source } = node;
    if (new Set(['fs']).has(source === null || source === void 0 ? void 0 : source.value)) {
        path.remove();
    }
}
exports.importDeclarationVisitor = importDeclarationVisitor;
//# sourceMappingURL=importDeclarationVisitor.js.map