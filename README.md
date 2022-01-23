# Your Project Name Here

This template gives you only what you need to get up and running with a new project that uses electron and holochain!

## Set Up after Clone

Global find and replace:

`ElectronHolochainTemplate`: replace with the actual name you wish to see appear in users desktop launcher icons: e.g. "Acorn"


## Versioning Information

This project is currently using:

https://github.com/holochain/holochain/releases/tag/holochain-0.0.115
https://github.com/Sprillow/holochain-runner/releases/tag/v0.0.32
https://docs.rs/hdk/0.0.115/hdk/index.html

and electron 16
https://www.electronjs.org/docs/latest/api/app



## Developers

### Run Locally and Develop on your Computer

_Prerequisites_

- Have rust language (stable) installed on your system
- Have nodejs version 14 installed on your system

Then run

- `npm run install-deps`
- `npm run dev`

In the future, just run `npm run dev` anytime to develop.

When you run `npm run dev` a `user-data/` directory is created and this is where user data including private keys, and also data generated through use of the app is stored.

You can run `npm run user-data-reset` if you have user data in development, but you want to clear it, and start over with fresh identities.

> NOTE: if you see a blank screen once electron launches the app, refresh the page (using View -> Reload or Cmd/Ctrl-R) to see app contents.

#### Commands that are more specific to your use case:

**dna**

- Have rust language (stable) installed on your system, then...
- `npm run dna-install`: installs wasm32 compilation target for rust as well as the Holochain CLI
- `npm run dna-pack`: compiles zomes into wasm and packages each one into a dna using Holochain CLI 
- `npm run dna-reset`: runs `dna-pack` and clears user data (Run this anytime you change the code in `dna` folder during development)

To test backend:

- `npm run dna-test`: runs unit tests

**web** (user interface)

- Use nodejs version 14
- `npm run web-install`
- `npm run web`

**electron**

- `npm run electron-install`
- `npm run electron-tsc` (needs to be re-run whenever electron folder source code changes)
- `npm run electron`

#### Multi-User Testing
run the following commands in separate terminal instances (must have a running instance of acorn for the first user, either by running `npm run dev` or the below commands without the `2`):

- `npm run web2`
- `npm run electron2`

After running these commands, a `user2-data/` directory is created with user data. It too can be cleared by running `npm run user-data-reset`.

### Building / Packaging

To build:

- `npm run build`

> Macos: You will need to have set
> APPLE_ID_EMAIL
> and
> APPLE_ID_PASSWORD
> as environment variables, in addition to having a certificate for the Apple Developer
> account installed on the system you are building on.

You will find the packaged executables in `electron/out`.
