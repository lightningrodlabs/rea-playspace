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
  const [processes, setProcesses] = useState<ProcessSpecification[]>([])

  const onDragStart = (event:DragEvent, name: string, type: string) => {
    const data = {name, type};
    event.dataTransfer!.setData('application/reactflow', JSON.stringify(data));
    event.dataTransfer!.effectAllowed = 'move';
  };

  const palletStyles = {
    flex:1,
    border: "1px solid black"
  }

  useEffect(()=>{
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

    getResources();
    getProcesses();
  }, []);


  function renderNodes(list, type) {
    if (list.length > 0) {
      return (list.map((item: any) => (
        <div 
        onDragStart={(event: any) => onDragStart(event, item.name, type)} 
        draggable>
          <PalletNode
            key={item.id}
            thing={item}
        />
        </div>
      )));
    }
    return (<p>Loading...</p>);
  }


  return (
    <aside style={palletStyles}>
      <div><strong>Resources</strong></div><br/>
      {renderNodes(resources, 'resource')}
      <div><strong>Processes</strong></div><br/>
      {renderNodes(processes, 'process')}
    </aside>
  )
}

export default Pallet;