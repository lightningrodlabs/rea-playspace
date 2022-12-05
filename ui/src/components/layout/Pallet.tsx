import { SlAlert, SlIcon, SlIconButton } from "@shoelace-style/shoelace/dist/react/index";
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Pathed } from "data-providers";
import { getLastPart } from "typed-object-tweezers";
import PalletNode from '../nodes/PalletNode';
import { getDataStore } from '../../data/DataStore';
import { DisplayNode } from '../../data/models/Application/Display';
import { Process, ProcessSpecification, ResourceSpecification } from 'valueflows-models';
import { ModelType } from '../../data/models/Application';
import { Root } from '../../data/models/Application/Root';
import { usePath } from 'yaati';

interface Props {
  setEdit: (entity: any) => void
}

const Pallet: React.FC<Props> = () => {
  const resourceSpecifications = usePath<'root', Root, Pathed<ResourceSpecification>>('root.resourceSpecification', getDataStore());
  const processSpecifications = usePath<'root', Root, Pathed<ProcessSpecification>>('root.processSpecification', getDataStore());
  const [resourceList, setResourceList] = useState<Pathed<ResourceSpecification>[]>([]);
  const [processList, setProcessList] = useState<Pathed<ProcessSpecification>[]>([]);
  const [open, setOpen] = useState(false);
  const [dependentCount, setDependentCount] = useState<number>();

  const navigate = useNavigate();

  useEffect(()=>{
    if (resourceSpecifications) {
      setResourceList(Object.values(resourceSpecifications));
    }
  }, [resourceSpecifications]);

  useEffect(()=>{
    if (processSpecifications) {
      setProcessList(Object.values(processSpecifications));
    }
  }, [processSpecifications]);

  let { id: planId } = useParams();

  /**
   * When we drag an item from here to the FlowCanvas, create an object with a
   * path in it. We'll use that to get a cursor to the object.
   */
  const onDragStart = (event:DragEvent, item: Pathed<any>) => {
    const data = { path: item.path };
    event.dataTransfer!.setData('application/reactflow', JSON.stringify(data));
    event.dataTransfer!.effectAllowed = 'move';
  };

  const errorMessage = (): string => {
    return `Cannot delete as it is has ${dependentCount} dependent nodes.`;
  }

  function pickStyle(type: ModelType) {
    if (type === 'resourceSpecification') return 'resource-specification-colors';
    if (type === 'processSpecification') return 'process-colors process-shape';
  }

  function renderNodes(list: Pathed<ResourceSpecification>[] | Pathed<ProcessSpecification>[], type: ModelType) {
    if (list.length > 0) {
      return (list.map((item: any) => (
        <div
        key={item.id}
        onDragStart={(event: any) => onDragStart(event, item)}
        draggable
        className={'pallet-node ' + pickStyle(type)}>
          <PalletNode
            thing={item}
            onClick={palletNodeDeleteHandler}
            onDoubleClick={palletNodeEditHandler}
            type={type}
          />
        </div>
      )));
    }
    if (type === 'resourceSpecification') {
      return (<p style={{textAlign: "center", color: '#9E9E9E'}}>Click [+] to begin</p>);
    }
    return (<><br></br></>);
  }

  function palletNodeEditHandler(event, id: string, type: ModelType) {
    event.preventDefault();
    if (event.detail === 2) {
      switch (type) {
        case 'resourceSpecification':
          navigate(`/resource-specifications/edit/${id}`);
          break;
        case 'processSpecification':
          navigate(`/process-specifications/edit/${id}`);
          break;
      }
    }
  }

  function palletNodeDeleteHandler(event, id: string, type: ModelType) {
    const store = getDataStore();
    if (event.altKey) {
      // check to see if it is in use
      let displayNodes: Pathed<DisplayNode>[] = store.getDisplayNodes(planId);
      let matchedNodes: Pathed<DisplayNode>[] = [];
      displayNodes.forEach((node, index) => {
        // resource specs
        let referenceId = '';
        if (type === 'resourceSpecification') {
          referenceId = getLastPart(node.vfPath); // get ID from end of path
          console.log(`vfId of ${node.name}: `, referenceId);
        }

        if (type === 'processSpecification') {
          const process: Process =  store.getCursor(node.vfPath);
          referenceId = process.basedOn;
        }

        if (referenceId === id) {
          matchedNodes.push(node);
        }
      });

      if (matchedNodes.length === 0) {
        const path = store.lookUpPath(id);
        store.delete(path);
      } else {
        setDependentCount(matchedNodes.length);
        setOpen(true);
      }
    }
  }

  return (
    <aside className='pallet-styles'>
      <SlAlert variant="danger" duration={2000} open={open} closable onSlAfterHide={() => setOpen(false)}>
        <SlIcon slot="icon" name="info-circle" />
        {errorMessage()}
      </SlAlert>
      <div className='category-styles'>
        <h2>
          <Link to="/resource-specifications/new">
            <SlIconButton name="plus-square-fill" label="Add resource specification." />
          </Link>
          Resource Specifications
        </h2>
      </div>
      {renderNodes(resourceList, 'resourceSpecification')}
      <br/>
      <div className='category-styles'>
        <h2>
          <Link to="/process-specifications/new">
            <SlIconButton name="plus-square-fill" label="Add process specification."/>
          </Link>
          Process Specifications
        </h2>
      </div>
      {renderNodes(processList, 'processSpecification')}
      <br/>
    </aside>
  )
}

export default Pallet;