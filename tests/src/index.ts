
import { Orchestrator } from "@holochain/tryorama";

import tree from './rea_playspace/tree/tree';

let orchestrator: Orchestrator<any>;

orchestrator = new Orchestrator();
tree(orchestrator);
orchestrator.run();



