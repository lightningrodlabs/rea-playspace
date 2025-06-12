#!/bin/bash
# Compile Rust to WASM
# add any additional zomes here, in the same way
cargo build --release --target wasm32-unknown-unknown --manifest-path happ/zomes/projects_core/Cargo.toml
cargo build --release --target wasm32-unknown-unknown --manifest-path happ/zomes/projects/Cargo.toml

# Pack DNAs
# add any additional dnas here, in the same way
hc dna pack --output=happ/workdir/rea_playspace.dna happ/workdir

# Pack hApp
hc app pack --output=happ/workdir/rea_playspace.happ happ/workdir
