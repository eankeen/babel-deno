import ansiRegex from 'ansi-regex';

var stripAnsi = string => typeof string === 'string' ? string.replace(ansiRegex(), '') : string;

export default stripAnsi;
//# sourceMappingURL=index.js.map
