#!/bin/bash
# Compile the WASM
CARGO_TARGET_DIR=target cargo build --release --target wasm32-unknown-unknown
# Pack DNAs
hc dna pack --output=back/workdir/profiles.dna back/workdir/dna/profiles
hc dna pack --output=back/workdir/projects.dna back/workdir/dna/projects
# Pack the Happ with everything
hc app pack --output=back/workdir/acorn.happ back/workdir/happ