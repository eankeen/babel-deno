import type { Primitive } from 't';
export declare class Mod {
    node: any;
    constructor(node: any);
    /**
     * ensure we have an import statement at the top of a file
     * for a deno std lib
     */
    ensureStdImport(denoImports: Record<string, Primitive>, moduleName: string, pathName: string): void;
}
//# sourceMappingURL=Mod.d.ts.map