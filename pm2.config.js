module.exports = {
  apps: [
    {
      name: 'web-gui',
      script: 'pnpm run web',
      ignore_watch: ['.'],
      env: {
        NODE_ENV: 'development',
      },
    },
    {
      name: 'electron-holochain',
      script: 'sleep 5 && ./electron/node_modules/.bin/electron electron',
      watch: ['electron/dist'],
      env: {
        NODE_ENV: 'development',
      },
    },
    // {
    //   name: 'electron-recompile',
    //   script: './frontend/electron/node_modules/.bin/tsc --project frontend/electron/tsconfig.json',
    //   watch: ['frontend/electron/src'],
    //   env: {
    //     NODE_ENV: 'development',
    //   },
    // },
  ],
}
