"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTestFiles = exports.readTranspileAndWrite = exports.writeDenoFile = exports.transpile = exports.readNodeFile = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const babel = __importStar(require("@babel/core"));
async function readNodeFile(fixturesDirPath, fileName) {
    const fileNamePath = path_1.default.join(fixturesDirPath, `${fileName}.mjs`);
    const input = await fs_1.default.promises.readFile(fileNamePath, { encoding: 'utf8' });
    return input;
}
exports.readNodeFile = readNodeFile;
function transpile(pluginNamePath, fileContents) {
    /* eslint-disable-next-line */
    const plugin = require(pluginNamePath);
    // @ts-ignore
    return babel.transformAsync(fileContents, {
        plugins: [plugin],
        ast: false,
    });
}
exports.transpile = transpile;
async function writeDenoFile(fixturesDirPath, fileName, outputContent) {
    const outputPath = path_1.default.join(fixturesDirPath, `${fileName}.deno.js`);
    await fs_1.default.promises.writeFile(outputPath, outputContent);
}
exports.writeDenoFile = writeDenoFile;
async function readTranspileAndWrite(pluginNamePath, fixturesDirPath, testFileName) {
    const nodeFileContents = await readNodeFile(fixturesDirPath, testFileName);
    const denoResult = await transpile(pluginNamePath, nodeFileContents);
    if (!(denoResult === null || denoResult === void 0 ? void 0 : denoResult.code))
        throw new Error('somehow, there was problem transpiling and no code was returned');
    await writeDenoFile(fixturesDirPath, testFileName, denoResult.code);
    return {
        nodeFile: nodeFileContents,
        denoResult,
    };
}
exports.readTranspileAndWrite = readTranspileAndWrite;
/**
 * @desc gets all files ending in .mjs and returns their fileNames (
 * without the prefix)
 */
function getTestFiles(fixturesFolder) {
    const fixtureFiles = fs_1.default.readdirSync(fixturesFolder, { withFileTypes: true });
    return fixtureFiles
        .filter((dirent) => dirent.isDirectory)
        .filter((dirent) => dirent.name.includes('.mjs'))
        .map((dirent) => dirent.name.slice(0, -4));
}
exports.getTestFiles = getTestFiles;
//# sourceMappingURL=test.utils.js.map