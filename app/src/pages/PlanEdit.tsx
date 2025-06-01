import React from "react";
import FlowCanvas from "../components/layout/FlowCanvas";
import Pallet from "../components/layout/Pallet";

interface Props {
  setEdit: (entity: any) => void;
}

const EditPlan: React.FC<Props> = ({setEdit}) => {
  return(
    <div style={{display:"flex"}}>
      <Pallet
        setEdit={setEdit}
      />
      <FlowCanvas />
    </div>
  )
}

export default EditPlan;