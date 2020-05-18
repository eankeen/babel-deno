import path from 'path';
import fs from 'fs';
import util from 'util';
import child_process from 'child_process';
import * as babel from '@babel/core';
import plugin from '../lib/index';

const exec = util.promisify(child_process.exec);

/**
 * @param {string} fileName
 * @return {Promise<string>}
 */
export async function readNodeFile(fileName) {
  const fileNamePath = path.join(__dirname, 'fixtures', `${fileName}.mjs`);
  const input = await fs.promises.readFile(fileNamePath, { encoding: 'utf8' });
  return input;
}

/**
 * @param {string} fileContents
 * @return {Promise<BabelFileResult>}
 */
export async function transpile(fileContents) {
  return await babel.transformAsync(fileContents, {
    plugins: [plugin],
    ast: false,
  });
}

/**
 * @param {string} filename
 * @return {Promise<void>}
 */
export async function writeDenoFile(
  fileName,
  outputContent,
) {
  if (!module?.parent?.filename) {
    throw new Error('module.parent.filename not what we think it is');
  }
  const outputPath = path.join(
    path.join(
      path.dirname(module.parent.filename),
      'fixtures',
      `${fileName}.deno.js`,
    ),
  );
  await fs.promises.writeFile(outputPath, outputContent);
}

/**
 * @typedef {Object} ReadTranspileAndWriteResult
 * @property {string} nodeFile
 * @property {BabelFileResult} denoResult
 */

/**
 * @param {string} fileName
 * @async
 * @return {ReadTranspileAndWriteResult}
 */
export async function readTranspileAndWrite(fileName) {
  const nodeFileContents = await readNodeFile(fileName);
  const denoResult = await transpile(nodeFileContents);
  if (!denoResult?.code) throw new Error('somehow, there was problem transpiling and no code was returned');
  await writeDenoFile(fileName, denoResult.code);
  return {
    nodeFile: nodeFileContents,
    denoResult,
  };
}

/**
 * @typedef {Object} StdOutErrReturn
 * @property {string} stdout
 * @property {string} stderr
 */

/**
 * @param {string} fileName
 * @async
 * @async
 * @return {StdOutErrReturn}
 */
export async function nodeRun(fileName) {
  const scriptPath = path.join(__dirname, 'fixtures', `${fileName}.mjs`);
  const { stdout, stderr } = await exec(`node ${scriptPath}`, {
    cwd: path.join(__dirname, 'fixtures'),
    windowsHide: true,
  });
  return { stdout, stderr };
}

/**
 * @param {string} fileName
 * @async
 * @return {StdOutErrReturn}
 */
export async function denoRun(fileName) {
  const scriptPath = path.join(__dirname, 'fixtures', `${fileName}.deno.js`);
  const { stdout, stderr } = await exec(`deno run -A ${scriptPath}`, {
    cwd: path.join(__dirname, 'fixtures'),
    windowsHide: true,
  });
  return { stdout, stderr };
}

/**
 * @desc gets all files ending in .mjs and returns their fileNames (
 * without the prefix)
 */
export function getNodeFiles() {
  const fixtureFolder = path.join(__dirname, 'fixtures');
  const fixtureFiles = fs.readdirSync(fixtureFolder, { withFileTypes: true });
  return fixtureFiles
    .filter((dirent) => dirent.isDirectory)
    .filter((dirent) => dirent.name.includes('.mjs'))
    .map((dirent) => dirent.name.slice(0, -4));
}
