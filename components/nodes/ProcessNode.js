import React, { memo, useState } from 'react';
import AddCommitmentModal from "../modals/AddCommitmentModal";

export default memo(({data}) => {
  const [isCommitmentOpen, setIsCommitmentOpen] = useState(false);
  const [type, setType] = useState("");

  function toggleCommitmentModal(type) {
    
    setIsCommitmentOpen(!isCommitmentOpen);
  }

  function handleToggleModal(type, fn) {
    setType(type);
    toggleCommitmentModal
  }

  const processStyle = { 
    display: "flex",
    flexWrap: "nowrap",
    justifyContent: "space-evenly",
    padding: "50px", 
    border: "solid black 1px", 
    borderRadius: "20px"
  }

  const buttonStyle = {
    borderRadius: "200px",
    margin: "5px",
    height: "50px"
  }

  return (
    <>
      <div style={processStyle}>
      <button onClick={() => toggleCommitmentModal("input")} style={buttonStyle}>Add Input</button>
        <form >
          <input placeholder="Process Name"></input>
        </form>
        <button onClick={() => toggleCommitmentModal("output")} style={buttonStyle}>Add Output</button>
      </div>
    <AddCommitmentModal isCommitmentOpen={isCommitmentOpen} toggleCommitmentModal={toggleCommitmentModal} type={type}/>
    </>
  );
});