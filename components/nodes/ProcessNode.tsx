import React from 'react';

interface Props {
  resourceName: string
}

const ProcessNode: React.FC<Props> = ({resourceName}) => {

  return (
    <div>
      <p><strong>Name: </strong>{resourceName}</p>
    </div>
  );
}

export default ProcessNode;