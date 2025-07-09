#!/bin/bash
# Compile Rust to WASM
# add any additional zomes here, in the same way
cargo build --release --target wasm32-unknown-unknown

echo `pwd`

# Pack DNAs
# add any additional dnas here, in the same way
hc dna pack --output=dnas/projects/workdir/rea_playspace.dna dnas/projects/workdir

# Pack hApp
hc app pack --output=workdir/rea_playspace.happ workdir
