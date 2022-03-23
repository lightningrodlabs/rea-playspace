import { SlButton } from "@shoelace-style/shoelace/dist/react";
import React from "react";
import Modal from "react-modal";
import CreateEconomicResource from "../../CreateEconomicResource";

Modal.setAppElement("#root");

interface Props {
  isOpen: boolean;
  myAgentId: string;
  handleAddNode: () => void;
  toggleModal: () => void;
  setCurrentNodeName: React.Dispatch<React.SetStateAction<string | undefined>>
}

const BlankAddModal:React.FC<Props>  = (props) => {

  return (
    <Modal
      style={{overlay: {zIndex: 2000}}}
      isOpen={props.isOpen}
      onAfterClose={props.handleAddNode}
    >
    <CreateEconomicResource 
      myAgentId={props.myAgentId} 
      setCurrentNodeName={props.setCurrentNodeName} 
      closeModal={props.toggleModal}/>
    </Modal>
  );
}

export default BlankAddModal;

