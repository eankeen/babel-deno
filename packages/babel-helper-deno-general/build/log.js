"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = exports.warn = exports.info = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const util_1 = __importDefault(require("util"));
/**
 * @desc
 * @argument {string[]} args - extra args to pass to console.log
 * @todo fix so this works as intended
 */
function log(logSeverity, text, ...args) {
    const babelDenoLogFile = path_1.default.join(process.cwd(), '.babel-deno.log');
    let formattedString;
    if (args) {
        formattedString = util_1.default.format.apply(null, [text, ...args]);
    }
    else {
        formattedString = text;
    }
    try {
        fs_1.default.appendFileSync(babelDenoLogFile, `${new Date().toUTCString()}: ${formattedString}\n`);
    }
    catch (err) {
        console.error(err);
        if (err.EEXISTS) {
            fs_1.default.writeFileSync(babelDenoLogFile, '');
            log(logSeverity, text, args);
        }
    }
}
function info(text, ...args) {
    log('info', text, args);
}
exports.info = info;
function warn(debug, text, ...args) {
    log('warn', text, args);
    debug(text);
}
exports.warn = warn;
function error(debug, text, ...args) {
    log('error', text, args);
    debug(text);
    console.error.apply(null, [text, ...args]);
    throw new Error(text);
}
exports.error = error;
//# sourceMappingURL=log.js.map