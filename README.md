# rea-playspace
Holochain app to play with REA accounting.

##  Developers

The backend is a bundled [Holo-REA](https://github.com/holo-rea/holo-rea) running in the [Holochain Launcher](https://github.com/holochain/launcher). 

[Follow these steps](https://github.com/Connoropolous/holo-rea/releases/tag/v0.0.14-alpha) to setup a development backend. The HackMD article in the previous link provided an excellent intro to launching Holo-REA, exploring the GraphQL API using the bundled GraphIQL web app as well as a primer to the [Valueflows](https://www.valueflo.ws/) vocabulary.

This project was scaffolded using the [RAD create tool](https://www.npmjs.com/package/@holochain-open-dev/create) which follows the patterns from [Holochain Open Dev](https://holochain-open-dev.github.io/).

Pending POC - We are considering using [jointJS](https://www.jointjs.com), diagram modeling library, for the main portion of the UI. This will be confirmed in the coming days.

## Valueflows Lingo

The UI will need to Query and Mutate the following which is a subset of the [Valueflows vocabulary](https://www.valueflo.ws/specification/uml/).
- Agents
- EconomicEvents
- ResourceSpecifications
- EconomicResources
- Commitment
- Intent
- Satisfaction
- Fullfillment
- Process
- Plan

## License
[![License: CAL 1.0](https://img.shields.io/badge/License-CAL%201.0-blue.svg)](https://github.com/holochain/cryptographic-autonomy-license)

  Copyright (C) 2022, Harris-Braun Enterprises, LLC

This program is free software: you can redistribute it and/or modify it under the terms of the license
provided in the LICENSE file (CAL-1.0).  This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
