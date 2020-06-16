"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helper_plugin_utils_1 = require("@babel/helper-plugin-utils");
const babel_plugin_deno_fs_promises_1 = __importDefault(require("babel-plugin-deno-fs-promises"));
const preset_flow_1 = __importDefault(require("@babel/preset-flow"));
exports.default = helper_plugin_utils_1.declare((api, opts) => {
    api.assertVersion(7);
    return {
        presets: [preset_flow_1.default],
        plugins: [babel_plugin_deno_fs_promises_1.default],
    };
});
//# sourceMappingURL=index.js.map