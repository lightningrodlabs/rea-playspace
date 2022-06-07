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
          width: '50%',
          maxHeight: '80%',
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch'
        }
      }}
      isOpen={isOpen}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
    >
      <SlIconButton name="x-square-fill" onClick={closeModal}/>
      <>{children}</>
    </Modal>
  );
}

export default ModalContainer;

