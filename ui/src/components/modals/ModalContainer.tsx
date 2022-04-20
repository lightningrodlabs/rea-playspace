import { SlIconButton } from "@shoelace-style/shoelace/dist/react";
import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

interface Props {
  isOpen: boolean;
  closeModal: () => void;
}

const ModalContainer:React.FC<Props>  = ({isOpen, closeModal, children}) => {

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
    >
      <SlIconButton name="x-square-fill" onClick={closeModal}/>
      <>{children}</>
    </Modal>
  );
}

export default ModalContainer;

