"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mod = void 0;
class Mod {
    constructor(node) {
        this.node = node;
    }
    /**
     * ensure we have an import statement at the top of a file
     * for a deno std lib
     */
    ensureStdImport(denoImports, moduleName, pathName) {
        // @ts-ignore
        denoImports.add({
            moduleName,
            pathName,
        });
    }
}
exports.Mod = Mod;
//# sourceMappingURL=Mod.js.map