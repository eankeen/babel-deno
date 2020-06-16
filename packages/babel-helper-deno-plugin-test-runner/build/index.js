"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runner = void 0;
const path_1 = __importDefault(require("path"));
const test_utils_1 = require("./test.utils");
function runner(dirname) {
    const fixturesDirPath = path_1.default.join(dirname, 'fixtures');
    const pluginFilePath = path_1.default.join(dirname, '../src/index.ts');
    const pluginName = path_1.default
        .basename(path_1.default.join(dirname, '../'))
        .slice('babel-plugin-deno-'.length);
    describe(`integration: plugin-${pluginName}`, () => {
        const testFiles = test_utils_1.getTestFiles(fixturesDirPath);
        for (const testFile of testFiles) {
            /* eslint-disable-next-line no-loop-func */
            test(`snapshot: ${testFile}`, async () => {
                const { denoResult } = await test_utils_1.readTranspileAndWrite(pluginFilePath, fixturesDirPath, testFile);
                expect(denoResult.code).toMatchSnapshot();
            });
        }
    });
}
exports.runner = runner;
//# sourceMappingURL=index.js.map