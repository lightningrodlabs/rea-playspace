# This file needs an environment sourced before it will run

electron/node_modules/electron-holochain/binaries/holochain-runner\
  ./happ/workdir/application.happ\
  ./$REA_PLAYSPACE_DATASTORE_PATH\
  --admin-ws-port $REA_PLAYSPACE_ADMIN_WS_PORT\
  --app-ws-port $REA_PLAYSPACE_APP_WS_PORT\
  --app-id $REA_PLAYSPACE_APP_ID\
  --keystore-path ./$REA_PLAYSPACE_KEYSTORE_PATH