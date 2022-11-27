#!/usr/bin/env bash

# commented out since we have no rust tests

# --nocapture makes sure the logging output is visible
# cargo test -j 2 --manifest-path happ/tests/Cargo.toml --lib --features="mock" -- --nocapture

cd tests
pnpm test
[ $? -eq 0 ]  || exit 1
cd -

cd modules/typed-object-tweezers
pnpm test
[ $? -eq 0 ]  || exit 1
cd -

cd modules/data-providers
pnpm test
[ $? -eq 0 ]  || exit 1
cd -

cd modules/yaati
pnpm test
[ $? -eq 0 ]  || exit 1
cd -
