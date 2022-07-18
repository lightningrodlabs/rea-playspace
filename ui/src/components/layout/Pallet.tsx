import { SlIconButton } from '@shoelace-style/shoelace/dist/react';
import React, { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { Agent, ProcessSpecification, ResourceSpecification } from "../../data/models/Valueflows/Knowledge";
import { PathedData } from "../../data/models/PathedData";
import PalletNode from '../PalletNode';
import getDataStore from '../../data/DataStore';

interface Props {
  resourceSpecifications: Array<ResourceSpecification>,
  processSpecifications: Array<ProcessSpecification>,
  agents: Array<Agent>
  updateState: (id: string, type: string) => void
}

const Pallet: React.FC<Props> = ({
  resourceSpecifications,
  processSpecifications,
  agents,
  updateState
}) => {

  /**
   * When we drag an item from here to the FlowCanvas, create an object with a
   * path in it. We'll use that to get a cursor to the object.
   */
  const onDragStart = (event:DragEvent, item: PathedData) => {
    const data = { path: item.path };
    event.dataTransfer!.setData('application/reactflow', JSON.stringify(data));
    event.dataTransfer!.effectAllowed = 'move';
  };

  function pickStyle(type: string) {
    if (type === 'resourceSpecification') return 'resource-specification-pallet-node';
    if (type === 'processSpecification') return 'process-specification-pallet-node';
    if (type === 'agent') return 'agent-pallet-node';
  }

  function renderNodes(list, type) {
    if (list.length > 0) {
      return (list.map((item: any) => (
        <div
        key={item.id}
        onDragStart={(event: any) => onDragStart(event, item)}
        draggable
        className={'pallet-node ' + pickStyle(type)}>
          <PalletNode
            thing={item}
            onClick={palletNodeHandler}
            type={type}
          />
        </div>
      )));
    }
    return (<p style={{textAlign: "center"}}>No items</p>);
  }

  function renderAgents(list: Array<any>, type: string) {
    if (list.length > 0) {
      return (list.map((item: any) => (
        <div
        key={item.id}
        className={'pallet-node ' + pickStyle(type)}>
          <PalletNode
            thing={item}
            onClick={palletNodeHandler}
            type={type}
          />
        </div>
      )));
    }
    return (<p style={{textAlign: "center"}}>No items</p>);
  }

  function palletNodeHandler(event, id: string, type: string) {
    const store = getDataStore();
    if (event.shiftKey) {
      store.delete(store.lookUpPath(id));
      store.fetchAll('root');
      updateState(id, type);
    }
  }

  return (
    <aside className='pallet-styles'>
      <div className='category-styles'>
      <h2>
        <Link to="/resources/new">
          <SlIconButton name="plus-square-fill" label="Settings" />
        </Link>
        Resource Specifications
      </h2>
      </div>
      {renderNodes(resourceSpecifications, 'resourceSpecification')}
      <br/>
      <div className='category-styles'>
        <h2>
          <Link to="/processes/new">
          <SlIconButton name="plus-square-fill" label="Settings"/>
          </Link>
          Process Specifications
        </h2>
      </div>
      {renderNodes(processSpecifications, 'processSpecification')}
      <br/>
      <div className='category-styles'>
        <h2>
          <Link to="/agents/new">
            <SlIconButton name="plus-square-fill"   label="Settings" />
          </Link>
          Agents
        </h2>
      </div>
      {renderAgents(agents, 'agent')}
      <br/>
    </aside>
  )
}

export default Pallet;