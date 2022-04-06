import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import {UPDATE_ECONOMIC_RESOURCES} from "../graphql/queries";

export type PalletNodeProps = {
  resource: any;
  myAgentId: string;
};

const PalletNode: React.FC<PalletNodeProps> = ({
  resource,
  myAgentId,
}) => {
  return (
    <div className="resource-list-table-item">
      {/* Resource Name */}
      <div className="resource-list-resource-name">
        {/* HACK: todo, fix once name is added */}
        {resource.note}
      </div>
    </div>
  );
};

export default PalletNode;