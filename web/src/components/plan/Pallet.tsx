import React, { useEffect, useState } from 'react';
import HoloService from '../../service';
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

const resourcePalletNodeStyles = {
    border: "1px solid green",
    background: "lightgreen",
    margin: "5px",
    borderRadius: "10px"
}

const processPalletNodeStyles = {
  border: "1px solid orange",
  background: "rgb(255, 213, 128)",
  margin: "5px",
  borderRadius: "10px"
}

  function renderNodes(list, type) {
    if (list.length > 0) {
      return (list.map((item: any) => (
        <div 
        onDragStart={(event: any) => onDragStart(event, item.name, type)} 
        draggable
        style={type === 'resource' ? resourcePalletNodeStyles : processPalletNodeStyles}>
          <PalletNode
            key={item.id}
            thing={item}

        />
        </div>
      )));
    }
    return (<p style={{textAlign: "center"}}>No items</p>);
  }


  const palletStyles = {
    flex:1,
    border: "1px solid black"
  }

  const categoryStyles = {
    border: "1px solid black",
    background: "lightgray",
    margin: "5px",
    padding: "5px"
  }


  return (
    <aside style={palletStyles}>
      <div style={categoryStyles}><strong>Resources</strong></div>
      {renderNodes(resources, 'resource')}
      <br/>
      <div style={categoryStyles}><strong>Processes</strong></div>
      {renderNodes(processes, 'process')}
    </aside>
  )
}

export default Pallet;