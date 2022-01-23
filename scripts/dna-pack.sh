#!/bin/bash
# Compile Rust to WASM
# add any additional zomes here, in the same way
cargo build --release --target wasm32-unknown-unknown --manifest-path dna/zomes/zome_a/Cargo.toml

# Pack DNAs
# add any additional dnas here, in the same way
hc dna pack --output=dna/workdir/application.dna dna/workdir