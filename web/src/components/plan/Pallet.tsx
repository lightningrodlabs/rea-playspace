import React, { useEffect, useState } from 'react';
import HoloService from '../../service';
import service from '../../service';
import { TreeNode } from '../../types/holochain';
import { ProcessSpecification, ResourceSpecification } from '../../types/valueflows';
import { buildTree } from '../../utils';
import PalletNode from '../PalletNode';

interface Props {
  myAgentId: string,
  service: HoloService
}

const Pallet: React.FC<Props> = ({myAgentId, service}) => {

  const [resources, setResources] = useState<ResourceSpecification[]>([]);
  const [processes, setProcesses] = useState<ProcessSpecification[]>()

  const onDragStart = (event:DragEvent, name: string) => {
    event.dataTransfer!.setData('application/reactflow', name);
    event.dataTransfer!.effectAllowed = 'move';
  };

  const palletStyles = {
    flex:1,
    border: "1px solid black"
  }

  const nodeStyles = {
    border: "1px solid blue",
    background: "lightblue",
    margin: "5px"
  }

  const getResources = async () => {
    const result = await service.get_thing('resourceSpecification');
    const jsTree = buildTree(result.tree, result.tree[0]);
    const resources = jsTree.children.map((e) => {
      return JSON.parse(e.val.data) as ResourceSpecification;
    });
    setResources(resources);
  }

  const getProcesses = async () => {
    const result = await service.get_thing('processSpecification');
    const jsTree = buildTree(result.tree, result.tree[0]);
    const processes = jsTree.children.map((e) => {
      return JSON.parse(e.val.data) as ProcessSpecification;
    });
    setProcesses(processes);
  }

  useEffect(()=>{
    getResources();
    getProcesses();
  },[]);


  return (
    <aside style={palletStyles}>
      <div><strong>Resources</strong></div><br/>
      {resources.map((resource: any) => (
        <div 
        onDragStart={(event: any) => onDragStart(event, resource.name)} 
        draggable>
          <PalletNode
            key={resource.id}
            thing={resource}
            myAgentId={myAgentId}
        />
        </div>

      ))}
      <div><strong>Processes</strong></div><br/>
      {processes.map((process: any) => (
        <div 
        onDragStart={(event: any) => onDragStart(event, process.name)} 
        draggable>
          <PalletNode
            key={process.id}
            thing={process}
            myAgentId={myAgentId}
        />
        </div>

      ))}
    </aside>
  )
}

export default Pallet;