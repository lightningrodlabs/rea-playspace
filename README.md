# REA Playspace

[![CI](https://github.com/lightningrodlabs/rea-playspace/actions/workflows/test.yml/badge.svg)](https://github.com/lightningrodlabs/rea-playspace/actions/)

The REA Playspace is an electron based environment that lets people play with the concepts behind [Valueflows](https://www.valueflo.ws/).

This is based on a modified version of the [electron-holochain-template](https://github.com/Sprillow/electron-holochain-template). We took the webhapp we were building, shoehorned it into the `web` directory, converted it over to a vitejs project, moved over to pnpm, and we added a nix-shell setup.

In the process of moving things over, I found a few [interesting differences between the project structure of webhapps and electron-holochain-template apps](https://hackmd.io/JXX0M-nwS1i048eqTS6BLA).

## Set Up after Clone

Global find and replace:

`com.some-domain-name.app-name`: replace with an Apple ["bundle Id"](https://developer.apple.com/documentation/appstoreconnectapi/bundle_ids) that is registered on your Apple Developer account

### App Icon Images

Replace `electron/build/icon.icns`. This one is utilized by MacOS.

Replace `electron/build/icon.ico`. This one is utilized by Windows

TODO: linux

## Run Locally and Develop on your Computer

- `nix-shell`
- `pnpm run install-deps`
- `pnpm run web`

In another terminal run:

- `nix-shell`
- `pnpm run electron`

A `user-data/` directory is created and this is where user data including private keys, and also data generated through use of the app is stored.

You can run `npm run user-data-reset` if you have user data in development, but you want to clear it, and start over with fresh identities.

> NOTE: if you see a blank screen once electron launches the app, refresh the page (using View -> Reload or Cmd/Ctrl-R) to see app contents.

### Specific pnpm scripts:

It's assumed that you're using the `nix-shell` to run these.

**dna**

- `pnpm run happ-pack`: compiles zomes into wasm and packages each one into a dna using Holochain CLI
- `pnpm run happ-reset`: runs `happ-pack` and clears user data (Run this anytime you change the code in `happ` folder during development)

To test backend:

- `pnpm run happ-test-ts`: runs the Tryorama typescript tests of the dnas.
- `pnpm run happ-test-cargo`: runs the cargo unit tests (Currently not used)

**web** (user interface)

- `pnpm run web-install`
- `pnpm run web`

**electron**

- `pnpm run electron-install`
- `pnpm run electron-tsc` (**needs to be re-run whenever electron folder source code changes**)
- `pnpm run electron`

## Multi-User Development Testing
Some features to develop and test require running two instances of the app simultaneously. The project is set up with that in mind.

run the following commands in separate terminal instances (must have a running instance of acorn for the first user, by running or the below commands without the `2`):

- `pnpm run web2`
- `pnpm run electron2`

After running these commands, a `user2-data/` directory is created with user data. It too can be cleared by running `npm run user-data-reset`.

## Building / Packaging

To build:

- `nix-shell`
- `pnpm run build-all`: runs everything needed to build a complete executable

Or you can run each of these commands individually:

- `pnpm run web-build`: compiles the react app and packages it into the `web/dist` folder
- `pnpm run happ-pack`: compiles zomes into wasm and packages each one into a dna using Holochain CLI
- `pnpm run build`: compiles electron and bundles the built happ and the built web app.

The packaged executables can be found in `electron/out`.

In order to get cross-platform builds, just tag your repository like `v0.0.1` and push those tags to Github. CI will automatically start running a build, under the "Release" action.

> Macos: You will need to have set the following environment variables as repository secrets:
> - APPLE_CERTIFICATE_BASE64
> - APPLE_CERTIFICATE_PASS
> - APPLE_DEV_IDENTITY
> - APPLE_ID_EMAIL
> - APPLE_ID_PASSWORD
> 
> The first two should be set as equivalents of `MACOS_CERTIFICATE` = `APPLE_CERTIFICATE_BASE64` and `MACOS_CERTIFICATE_PWD` = `APPLE_CERTIFICATE_PASS` as found in the following article, which also provides other instruction regarding this: https://localazy.com/blog/how-to-automatically-sign-macos-apps-using-github-actions
>
> There is a sixth environment variable which is useful to set, like this: `DEBUG: electron-osx-sign*,electron-notarize*`. This allows for useful logging outputs from the signing and notarizing process. This env var is set automatically when running on CI, in the "Release" Github Action.


## Versioning For User Data

Each version of the app will either change, or not change, the paths to the user data folders in use by the application. 

The user data will be located under a folder with the same name as the value given under the [`name` property of the file `electron/package.json`](./electron/package.json#L2) in the platform specific appData folder, as specified by `appData` here: https://www.electronjs.org/docs/latest/api/app#appgetpathname

It is then in a specific sub-folder that relates to one of two types of data: 
- source chain and DHT -> `databases-${DATABASES_VERSION_ID}`
- private keys -> `keystore-${KEYSTORE_VERSION_ID}`

DATABASES_VERSION_ID and KEYSTORE_VERSION_ID are defined in `electron/src/holochain.ts` and can be modified as needed in order to jump to new versions of holochain, or a new app DNA.

You can tweak DATABASES_VERSION_ID and KEYSTORE_VERSION_ID independently. 

DATABASES_VERSION_ID should be incremented when a new DNA is in use. It will cause users to have to re-create profiles and re-instate data they've previously added.

KEYSTORE_VERSION_ID should be incremented if the version of lair-keystore changes, and has a new key format. Or if you otherwise want users to have to switch and generate new keys.


## Dependency Versions Information

This project is currently using:

https://github.com/holochain/holochain/releases/tag/holochain-0.0.127

https://github.com/Sprillow/holochain-runner/releases/tag/v0.0.35

Lair Keystore Revision [v0.0.9 Nov 4, 2021](https://github.com/holochain/lair/releases/tag/v0.0.9)

https://docs.rs/hdk/0.0.122/hdk/index.html

and electron 16

https://www.electronjs.org/docs/latest/api/app


