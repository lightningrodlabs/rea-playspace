import Modal from "react-modal";
import AddCommitmentModal from "./AddCommitmentModal";
import React, {useState} from "react";

Modal.setAppElement("#root");

const flexStyle = {
  display: "flex",
  flexWrap: "nowrap",
  justifyContent: "space-evenly"
}

const processStyle = { 
  padding: "50px", 
  margin: "20px", 
  border: "solid black 1px", 
  borderRadius: "20px"
}

const buttonStyle = {
  borderRadius: "200px",
  marginTop: "50px",
  height: "50px"
}

const AddProcessModal = (props) => {
  const [type, setType] = useState();

  function handleAddCommitment(type, fn) {
    setType(type);
    props.toggleCommitmentModal();
  }

  return <Modal
    shouldCloseOnOverlayClick={false}
    style={{
      overlay: {zIndex: 1000},
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
      },
    }}
    isOpen={props.isProcessOpen}
    onRequestClose={props.toggleProcessModal}
    contentLabel="My dialog">
    <span style={flexStyle}>
      <button onClick={() => handleAddCommitment("input", props.toggleCommitmentModal)} style={buttonStyle}>Add Input</button>
      <div style={processStyle}>
        <form >
          <input placeholder="Process Name"></input>
        </form>
      </div>
      <button onClick={() => handleAddCommitment("output")} style={buttonStyle}>Add Output</button>
    </span>
    <button onClick={props.toggleProcessModal} style={{margin: "10px"}}>Save Process</button>
    <button onClick={props.toggleProcessModal} style={{margin: "10px"}}>Close</button>
    <AddCommitmentModal isCommitmentOpen={props.isCommitmentOpen} toggleCommitmentModal={props.toggleCommitmentModal} type={type}/>
  </Modal>
}

export default AddProcessModal;