import React, { useState } from "react";

export type PalletNodeProps = {
  thing: any;
};

const PalletNode: React.FC<PalletNodeProps> = ({thing}) => {

  const styles = {
    padding: "4px",
    textAlign: "center"
  }
  return (
      <div style={styles}>
        {thing.name}
      </div>
  );
};

export default PalletNode;