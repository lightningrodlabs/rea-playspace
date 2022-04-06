import React from 'react';
import useEconomicResources from '../hooks/useEconomicResources';
import PalletNode from './PalletNode';
import ResourceListTableItem from './ResourceListTableItem';

interface Props {
  myAgentId: string
}

const Pallet: React.FC<Props> = ({myAgentId}) => {

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

  const { data, loading, error } = useEconomicResources();
  if (loading) return <div>Listing economic resources...</div>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;

  return (
    <aside style={palletStyles}>
      <div><strong>Resource Pallet</strong></div><br/>

      {data.map((resource: any) => (
        <div 
        onDragStart={(event: any) => onDragStart(event, resource.note)} 
        draggable>
          <PalletNode
            key={resource.id}
            resource={resource}
            myAgentId={myAgentId}
        />
        </div>

      ))}
    </aside>
  )
}

export default Pallet;