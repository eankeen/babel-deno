"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.programExitVisitor = void 0;
const core_1 = require("@babel/core");
function programExitVisitor(path) {
    // @ts-ignore
    for (const { moduleName, pathName } of this.denoImports) {
        const version = '0.53.0';
        const importAst = core_1.template(`
      import * as ${moduleName} from "https://deno.land/x/std@${version}/${pathName}/mod.ts"
    `)();
        path.unshiftContainer('body', [importAst]);
    }
}
exports.programExitVisitor = programExitVisitor;
//# sourceMappingURL=programExitVisitor.js.map