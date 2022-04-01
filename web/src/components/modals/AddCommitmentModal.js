import Modal from "react-modal";
import {useEffect} from "react";

Modal.setAppElement("#root");

const AddCommitmentModal = (props) => {

  useEffect(() => {
    // Some initialization logic here
  }, []);

  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return <Modal
    style={{
      overlay: {zIndex: 2000},
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
      },
    }}
    isOpen={props.isCommitmentOpen}
    onRequestClose={props.toggleCommitmentModal}
    contentLabel={props.type}>
    <div className="create">
      <h1>Create New {capitalize(props.type)} Commitment</h1>
      <form>
        <label>Notes</label>
        <textarea 
          name="Notes" 
          placeholder="Notes" 
        />
        <select name="Action" id="action" defaultValue={"Select Action"}>
          <option value="transfer">Transfer</option>
          <option value="plan">Plan</option>
          <option value="make">Make</option>
          <option value="clean">Clean</option>
          <option value="design">Design</option>
        </select>
      </form>
      <button onClick={props.toggleCommitmentModal} style={{margin: "10px"}}>Cancel</button>
    </div>
  </Modal>
}

export default AddCommitmentModal;