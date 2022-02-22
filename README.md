# rea-playspace
Holochain app to play with REA accounting.

## Status
Active development, POC.

##  Developers

The backend is a bundled [Holo-REA](https://github.com/holo-rea/holo-rea) running in the [Holochain Launcher](https://github.com/holochain/launcher). 

[Follow these steps](https://github.com/Connoropolous/holo-rea/releases/tag/v0.0.14-alpha) to setup a development backend. The HackMD article in the previous link provided an excellent intro to launching Holo-REA, exploring the GraphQL API using the bundled GraphIQL web app as well as a primer to the [Valueflows](https://www.valueflo.ws/) vocabulary.

This project was scaffolded using the [RAD create tool](https://www.npmjs.com/package/@holochain-open-dev/create) which follows the patterns from [Holochain Open Dev](https://holochain-open-dev.github.io/).

## UI Design Ideas
[Resource Flow Diagrams](https://write.as/economic-networks/visual-languages-resource-flow-diagrams). Each [process](https://www.valueflo.ws/concepts/processes/) should be configurable to have multiple inputs and outputs, each which represents [economicResources](https://www.valueflo.ws/concepts/resources/#unique-identifiers-for-resources).



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

## Known Issues

> Can use createEconomicEvent mutation and economicEvents query, but can't use Economic Resources.

createEconomicEvent can't be passed a newInventoriedResource (which is the only way to persist an EconomicResource). It is a known bug in holo-rea and there is already [bit of discussion about a solution](https://github.com/holo-rea/holo-rea/issues/190) to the underlying problem.


## License
[![License: CAL 1.0](https://img.shields.io/badge/License-CAL%201.0-blue.svg)](https://github.com/holochain/cryptographic-autonomy-license)

  Copyright (C) 2022, Harris-Braun Enterprises, LLC

This program is free software: you can redistribute it and/or modify it under the terms of the license
provided in the LICENSE file (CAL-1.0).  This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
