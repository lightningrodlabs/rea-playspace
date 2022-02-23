
import { Orchestrator } from "@holochain/tryorama";

import projects_project from './rea_playspace/projects/project';

let orchestrator: Orchestrator<any>;

orchestrator = new Orchestrator();
projects_project(orchestrator);
orchestrator.run();



