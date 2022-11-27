## About
This is a React + vitejs project. It uses pnpm for dependency management a nix setup for provisioning the holochain development environent.

## Nix

This project uses Nix. If you don't have Nix, [please install it](https://nixos.org/download.html#download-nix). If for some reason you're having issues on Apple silicon, you [can find some help here](https://adaburrows.com/writing/2022-09-02-nix-rosetta-fix/).

## Run Locally and Develop on your Computer
Begin by running
- `nix-shell .  # Installs all the dependencies for the dev environment, this make take a long time`

It's assumed that you're using the `nix-shell` to run all of the following `pnpm` commands

- `pnpm install # installs all of the dependencies need for the whole project`
- `pnpm build   # builds all of the npm modules in the ./modules directory`
- `pnpm run web # runs the web UI`

In another terminal run:

- `pnpm run hc:happ-pack  # builds the zomes and creates the packages used by the Holochain conductor`
- `pnpm run hc:run        # runs the Holochain conductor sandbox with the built hApp package`

To quickly clear your dev environment and restart the backend:
- `pnpm run hc:redo       # wipes away the Holochain sandbox, rebuilds the hApp, and starts the Holochain conductor sandbox`

## Specific pnpm scripts:

**dna**

- `pnpm run hc:happ-pack`: compiles zomes into wasm and packages each one into a dna using Holochain CLI
- `pnpm run hc:reset`: runs `hc:happ-pack` and clears previous data (Run this anytime you change the code in `happ` folder during development or want to purge the dev environment)

To test backend:

- `pnpm run test`: runs the Tryorama typescript tests of the dnas.

## Multi-User Development Testing
Some features to develop and test require running two instances of the app simultaneously. The project is set up with that in mind.

run the following commands in separate terminal instances (must have a running instance of acorn for the first user, by running or the below commands without the `2`):

- `pnpm run web2`
- `pnpm run hc:run2`

## Building / Packaging

To build:

- `nix-shell`
- `pnpm run webhapp-pack`: runs everything needed to build a complete executable .webhapp

Or you can run each of these commands individually:

- `pnpm run web-build`: compiles the react app and packages it into the `web/dist` folder
- `pnpm run happ-pack`: compiles zomes into wasm and packages each one into a dna using Holochain CLI

In order to get automated builds, just tag your repository like `v0.0.1` and push those tags to Github. CI will automatically start running a build, under the "Release" action.

## Upgrading Holochain
Follow [these instructions](https://developer.holochain.org/install/#upgrading-the-holochain-version).
