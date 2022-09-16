import React from 'react';

import { Handle, Position } from 'react-flow-renderer';

interface Data {
  id: string,
  name: string,
  agent?: string
}

interface Props {
  data: Data,
  selected: boolean
}

const ProcessNode: React.FC<Props> = ({data, selected}) => {
  const className = 'canvas-node-base process-colors process-shape' + (selected ? ' process-selected' : '' )
  return (
    <div key={data.id}>
      <div className={className}>
        <div className='canvas-node-body'>
          <p>{`${data.agent? data.agent + ': ' : ''}${data.name}`}</p>
          <Handle
              type="source"
              id="left"
              position={Position.Left}
              className='canvas-node-handle-base canvas-node-handle-left'
            />
            <Handle
              type="target"
              id="left"
              position={Position.Left}
              className='canvas-node-handle-base canvas-node-handle-left'
            >
            </Handle>
            <Handle
              type="source"
              id="top"
              position={Position.Top}
              className='canvas-node-handle-base canvas-node-handle-top'
            />
            <Handle
              type="target"
              id="top"
              position={Position.Top}
              className='canvas-node-handle-base canvas-node-handle-top'
            />
            <Handle
              type="source"
              id="right"
              position={Position.Right}
              className='canvas-node-handle-base canvas-node-handle-right'
            />
            <Handle
              type="target"
              id="right"
              position={Position.Right}
              className='canvas-node-handle-base canvas-node-handle-right'
            >
            </Handle>
            <Handle
              type="source"
              id="bottom"
              position={Position.Bottom}
              className='canvas-node-handle-base canvas-node-handle-bottom'
            />
            <Handle
              type="target"
              id="bottom"
              position={Position.Bottom}
              className='canvas-node-handle-base canvas-node-handle-bottom'
            />
        </div>
      </div>
    </div>
  );
}

export default ProcessNode;