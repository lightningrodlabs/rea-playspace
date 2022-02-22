# Developer Setup

> TLDR: run `npm install` and `npm start` inside the `nix-shell` for this repository.

## Requirements

- Having the [nix-shell installed](https://developer.holochain.org/docs/install/#install-the-nix-package-manager).
  - Note that you don't have to execute `nix-shell https://holochain.love` as we are going to be building on a custom version of holochain.
- Enter the nix-shell on this folder with:

```bash
nix-shell .
```

This will take a long time the first time you do it. To verify you have `holochain` and `hc` correctly installed:

```bash
holochain --version
```

Should give something like:

```bash
holochain 0.0.104
```

## Install

```bash
npm install
```

## Running

```bash
npm start
```

## Building

```bash
npm run build:happ
```

This should create a `workdir/happ/hrea-modeler-test.happ` file.

## Testing

```bash
npm test
```
