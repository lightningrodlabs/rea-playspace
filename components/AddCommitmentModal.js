import Modal from "react-modal";

Modal.setAppElement("#root");

const AddCommitmentModal = (props) => {
  console.log(props.type)
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
    <h1>{props.title}</h1>
    <form>
      <label>
        Name:
        <input type="text" name="name" />
      </label>
      <input type="submit" value="Submit" />
    </form>
    <button onClick={props.toggleCommitmentModal} style={{margin: "10px"}}>Close modal</button>
  </Modal>
}

export default AddCommitmentModal;