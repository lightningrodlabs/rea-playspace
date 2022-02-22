import { fromRollup } from '@web/dev-server-rollup';
import rollupCommonjs from '@rollup/plugin-commonjs';
import rollupReplace from '@rollup/plugin-replace';

const replace = fromRollup(rollupReplace);
const commonjs = fromRollup(rollupCommonjs);

export default [
  replace({
    'process.env.NODE_ENV': '"production"',
    'process.env.HC_PORT': JSON.stringify(process.env.HC_PORT),
    '  COMB =': 'window.COMB =',

    delimiters: ['', ''],
  }),
  commonjs({}),
];
