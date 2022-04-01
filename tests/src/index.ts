
import { Orchestrator } from "@holochain/tryorama";

//import projects_project from './rea_playspace/projects/project';
import tree from './rea_playspace/tree/tree';

let orchestrator: Orchestrator<any>;

orchestrator = new Orchestrator();
//projects_project(orchestrator);
tree(orchestrator);
orchestrator.run();



