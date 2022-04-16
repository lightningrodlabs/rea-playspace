import { SlIconButton } from "@shoelace-style/shoelace/dist/react";
import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

interface Props {
  isOpen: boolean;
  handleAddNode: () => void;
  toggleModal: () => void;
}

const ModalContainer:React.FC<Props>  = ({isOpen, handleAddNode, toggleModal, children}) => {

  return (
    <Modal
      style={{
        overlay: {zIndex: 2000},
        content: {
          top: '30%',
          left: '30%',
          right: '30%',
          bottom: 'auto',
          transform: 'translate(-20%, -20%)',
        }
      }}
      isOpen={isOpen}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
    >
      <SlIconButton name="x-square-fill" onClick={toggleModal}/>
      <>{children}</>
    </Modal>
  );
} 

export default ModalContainer;

