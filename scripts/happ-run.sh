# This file needs an environment sourced before it will run
#!/bin/bash
RUST_LOG=warn WASM_LOG=debug hc s -f=$REA_PLAYSPACE_ADMIN_WS_PORT generate ./happ/workdir/application.happ --run=$REA_PLAYSPACE_APP_WS_PORT -a $REA_PLAYSPACE_APP_ID network mdns



