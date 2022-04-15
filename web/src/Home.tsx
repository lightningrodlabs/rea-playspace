import React, { useEffect, useState } from "react";
import ZomeApi from "./api/zomeApi";
import FlowCanvas from "./components/layout/FlowCanvas";
import Pallet from "./components/layout/Pallet";
import { getZomeApi } from "./hcWebsockets";
import { RustNode, ThingInput } from "./types/holochain";
import { Agent, Plan, ProcessSpecification, ResourceSpecification } from "./types/valueflows";
import { buildTree } from "./utils";

interface Props {}

const Home: React.FC<Props> = () => {
  const [resourceSpecifications, setResourceSpecifications] = useState<ResourceSpecification[]>([]);
  const [processSpecifications, setProcessSpecifications] = useState<ProcessSpecification[]>([]);
  const [agents, setAgents] = useState<Agent[]>([])
  const zomeApi: ZomeApi = getZomeApi();

  useEffect(()=>{
    // check if root object exists
    zomeApi.get_thing('root').then(async (res) => {
      if (res[0].val.data === '') {
        console.log('root does not exist. creating...');
        const root = {}
        const rootInput: ThingInput = {
          path: 'root',
          data: JSON.stringify(root)
        }
        await zomeApi.put_thing(rootInput);

        const plan: Plan = {
          id: 'p1',
          name: 'There is no plan B.',
          created: new Date()
        }  

        const planInput: ThingInput = {
          path: 'root.plan.p1',
          data: JSON.stringify(plan)
        }
        await zomeApi.put_thing(planInput);
      }
      console.log('root exists.');

      const getResourceSpecifications = async () => {
        const result: Array<RustNode> = await zomeApi.get_thing('root.resourceSpecification');
        const jsTree = buildTree(result, result[0]);
        const resources = jsTree.children.map((e) => {
          return JSON.parse(e.val.data) as ResourceSpecification;
        });
        setResourceSpecifications(resources);
      }
    
      const getProcessSpecifications = async () => {
        const result = await zomeApi.get_thing('root.processSpecification');
        const jsTree = buildTree(result, result[0]);
        const processes = jsTree.children.map((e) => {
          return JSON.parse(e.val.data) as ProcessSpecification;
        });
        setProcessSpecifications(processes);
      }
  
      const getAgents = async () => {
        const result = await zomeApi.get_thing('root.agent');
        const jsTree = buildTree(result, result[0]);
        const agents = jsTree.children.map((e) => {
          return JSON.parse(e.val.data) as Agent;
        });
        setAgents(agents);
      }

      await getResourceSpecifications();
      await getProcessSpecifications();
      await getAgents();
    }).catch((e) => console.error(e));
  }, []);

  return(
    <div style={{display:"flex"}}>
      <Pallet 
        resourceSpecifications={resourceSpecifications}
        processSpecifications={processSpecifications}
        agents={agents}
      />
      <FlowCanvas />
    </div>
  )
}

export default Home;