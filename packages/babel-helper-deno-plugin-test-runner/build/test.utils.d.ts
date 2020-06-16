import type { BabelFileResult } from 'babel__core';
export declare function readNodeFile(fixturesDirPath: string, fileName: string): Promise<string>;
export declare function transpile(pluginNamePath: string, fileContents: string): Promise<BabelFileResult | null>;
export declare function writeDenoFile(fixturesDirPath: string, fileName: string, outputContent: string): Promise<void>;
export declare function readTranspileAndWrite(pluginNamePath: string, fixturesDirPath: string, testFileName: string): Promise<{
    nodeFile: string;
    denoResult: BabelFileResult;
}>;
/**
 * @desc gets all files ending in .mjs and returns their fileNames (
 * without the prefix)
 */
export declare function getTestFiles(fixturesFolder: any): Array<string>;
//# sourceMappingURL=test.utils.d.ts.map