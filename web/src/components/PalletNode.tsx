import React, { useState } from "react";

export type PalletNodeProps = {
  thing: any;
};

const PalletNode: React.FC<PalletNodeProps> = ({thing}) => {
  return (
    <div className="resource-list-table-item">
      <div className="resource-list-resource-name">
        {thing.name}
      </div>
    </div>
  );
};

export default PalletNode;