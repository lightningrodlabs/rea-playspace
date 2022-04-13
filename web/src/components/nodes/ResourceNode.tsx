import React, { memo } from 'react';

import { Handle, Position } from 'react-flow-renderer';

interface Data {
  name: string,
  label: string
}

interface Props {
  data: Data
}

const ResourceNode: React.FC<Props> = ({data}) => {

  const nodeStyles = {
    border: "1px solid green",
    background: "lightgreen",
    margin: "5px",
    borderRadius: "10px"
  }
  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: '#555' }}
        onConnect={(params) => console.log('handle onConnect', params)}
      />
      <div style={nodeStyles}>
        <p><strong>Name: </strong>{data.name}</p>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        style={{ background: '#555' }}
      />
    </>
  );
}

export default ResourceNode;