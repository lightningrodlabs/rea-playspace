import React, { CSSProperties } from 'react';

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
    border: '1px solid orange',
    width: '125px',
    height: '50px',
    background: "rgb(255, 213, 128)",
    borderRadius: "10px"
  }

  const nodeHeader: CSSProperties = {
    borderBottomWidth: '1px', 
    borderBottomStyle: 'solid',
    fontSize: '10px',
    paddingLeft: '8px',
    paddingTop: '4px',
    paddingBottom: '4px', 
    borderColor: 'orange'
  }

  const handleRight: CSSProperties = {
    width: "8px", 
    height: '8px', 
    backgroundColor: 'rgb(189, 196, 204)', 
    border: 'orange solid 1px', 
    position:'absolute', 
    right: '-4px',
    top: '35px'
  }

  const handleLeft: CSSProperties = { 
    width: "8px", 
    height: '8px', 
    backgroundColor: 'rgb(189, 196, 204)', 
    border: 'white solid 1px', 
    position:'absolute', 
    left: '-4px',
    top: '35px'
  }

  const nodeBody: CSSProperties = {
    fontSize: '10px',
    paddingLeft: "12px", 
    paddingRight: "12px"
  }

  return (
    <div style={{position:'relative', overflow: 'hidden'}}>

      <div style={nodeStyles}>
        <div style={nodeHeader}>{data.label}</div>
        <div style={nodeBody}>
          <Handle
            type="target"
            position={Position.Left}
            style={handleLeft}
            onConnect={(params) => console.log('handle onConnect', params)}
          />
          <p>{data.name}</p>
          <Handle
            type="source"
            position={Position.Right}
            id="a"
            style={handleRight}
          />
        </div>
      </div>

    </div>
  );
}

export default ProcessNode;