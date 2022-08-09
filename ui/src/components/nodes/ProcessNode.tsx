import React from 'react';

import { Handle, Position } from 'react-flow-renderer';

interface Data {
  id: string,
  name: string,
  agent?: string
}

interface Props {
  data: Data
}

const ProcessNode: React.FC<Props> = ({data}) => {
  return (
    <div key={data.id} style={{position:'relative'}}>
      <div className='canvas-node-base process-colors canvas-node-process'>
        <div className='canvas-node-body'>
          <Handle
            type="target"
            position={Position.Left}
            className='canvas-node-handle-base canvas-node-handle-left'
          />
          <p>{`${data.agent? data.agent + ': ' : ''}${data.name}`}</p>
          <Handle
            type="source"
            position={Position.Right}
            className='canvas-node-handle-base canvas-node-handle-right'
          />
        </div>
      </div>
    </div>
  );
}

export default ProcessNode;