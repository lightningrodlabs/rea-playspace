import plugins from './web-dev.plugins.mjs';

export default {
  watch: true,
  nodeResolve: {
    browser: true,
    preferBuiltins: false,
    exportConditions: ['browser', 'development'],
  },
  appIndex: 'demo/index.html',
  rootDir: '../',
  open: true,
  plugins,
};
