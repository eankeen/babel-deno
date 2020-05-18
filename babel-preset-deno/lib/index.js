import { declare } from '@babel/helper-plugin-utils';
// @ts-ignore
import syntaxFlow from '@babel/plugin-syntax-flow';
import denoFsPromises from 'babel-plugin-deno-fs-promises';

export default declare((api, opts) => {
  api.assertVersion(7);

  return {
    plugins: [
      syntaxFlow,
      denoFsPromises,
    ].filter(Boolean),
  };
});
