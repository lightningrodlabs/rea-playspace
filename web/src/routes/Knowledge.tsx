import React from "react";
import Resources from "../../../src/components/Resources";

interface Props {
  myAgentId: string;
}

const Knowledge: React.FC<Props> = ({myAgentId}) => {

  return(
    <div>
      <Resources myAgentId={myAgentId} />
    </div>
  )
}

export default Knowledge;