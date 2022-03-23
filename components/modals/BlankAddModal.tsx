import { SlButton } from "@shoelace-style/shoelace/dist/react";
import React from "react";
import Modal from "react-modal";
import CreateEconomicResource, { CreateEconomicResourceProps } from "../../CreateEconomicResource";

Modal.setAppElement("#root");

interface Props {
  isOpen: boolean;
  handleAddNode: () => void;
  toggleModal: () => void;
}

const BlankAddModal:React.FC<Props>  = (props) => {

  return (
    <Modal
      style={{overlay: {zIndex: 2000}}}
      isOpen={props.isOpen}
      onAfterClose={props.handleAddNode}
    >
      <>{props.children}</>
    </Modal>
  );
}

export default BlankAddModal;

