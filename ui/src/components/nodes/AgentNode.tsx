import React, { memo } from 'react';

import { Handle, Position } from 'react-flow-renderer';

interface Data {
  name: string,
  label: string
}

interface Props {
  data: Data
}

const ProcessNode: React.FC<Props> = ({data}) => {

  const nodeStyles = {
    border: "1px solid blue",
    background: "lightblue",
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
        <p style={{paddingLeft: "2px", paddingRight: "2px"}}><strong>{data.name}</strong></p>
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

export default ProcessNode;