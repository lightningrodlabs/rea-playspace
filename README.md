# REA Playspace

[![CI](https://github.com/lightningrodlabs/rea-playspace/actions/workflows/test.yml/badge.svg)](https://github.com/lightningrodlabs/rea-playspace/actions/)
[![CI](https://github.com/lightningrodlabs/rea-playspace/actions/workflows/release.yml/badge.svg)](https://github.com/lightningrodlabs/rea-playspace/actions/)

The REA Playspace is an electron based environment that lets people play with the concepts behind [Valueflows](https://www.valueflo.ws/).

![](./docs/assets/demo_flow.png)

## Installing
1) Download and install the latest [Holochain Launcher](https://github.com/holochain/launcher/tags/v0.4.7).

2) From the [releases page](https://github.com/lightningrodlabs/rea-playspace/releases/) download the latest `rea-playspace.webhapp` file.

3) Open the Holochain Launcher. Follow the prompts until you get to the main screen with the button 'INSTALL NEW APP' then 'SELECT APP FROM FILESTORE'. Select the `rea-playspace.webhapp` file from the previous step.

4) Use the default AppId. Select 0.0.136 for the Holochain version to install.

4+) Advanced: If you want to leave the UID option empty, you can. This will connect you to a network with everyone else who has also left the option empty. If you want to create a playspace with only a few others, enter a UID (any string of characters) and share it with them.

5) Click 'Install App'. Find the app in the Installed Apps view. Click open. This will launch it in the browser.


If you are a developer, check out the [Developer docs](./DEVELOP.md).




