# This file needs an environment sourced before it will run
#!/bin/bash
RUST_LOG=warn WASM_LOG=debug hc sandbox -f=$REA_PLAYSPACE_ADMIN_WS_PORT generate --root=$REA_PLAYSPACE_ROOT -d=$REA_PLAYSPACE_DIR ./happ/workdir/application.happ --run=$REA_PLAYSPACE_APP_WS_PORT -a $REA_PLAYSPACE_APP_ID network mdns
#RUST_LOG=warn WASM_LOG=debug hc sandbox -f=$REA_PLAYSPACE_ADMIN_WS_PORT run -e=$REA_PLAYSPACE_ROOT$REA_PLAYSPACE_DIR -p $REA_PLAYSPACE_APP_WS_PORT --all
