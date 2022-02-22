# Setting Up >> Adding the Zome ||10

1. In your `zomes` folder, run `cargo new hrea-modeler --lib`.
2. Add this zome as a dependency in the `Cargo.toml` file:

```toml
[dependencies]
hc_zome_hrea_modelers = {git = "https://github.com/holochain-open-dev/hrea-modeler", rev = "for-hc-v0.0.124", package = "hc_zome_hrea_modelers"}
```

Replace the `rev` field with the holochain version you are using. See [which tags are available](https://github.com/holochain-open-dev/hrea-modeler/tags).

3.  Replace the contents of the `lib.rs` with this content:

```rust
extern crate hc_zome_hrea_modelers;
```

4. Add this new crate to your top level `Cargo.toml`.
5. Add the zome into your `dna.yaml` file.
6. Compile the DNA with the usual `CARGO_TARGET_DIR=target cargo build --release --target wasm32-unknown-unknown`.
