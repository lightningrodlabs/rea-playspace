import React from 'react';
import { PathedData } from '../../data/models/PathedData';
import { CommitmentShape } from '../../types/valueflows';

interface Props {
  closeModal: () => void;
  handleAddEdge: (item: PathedData) => void;
}

const initialState = {

} as CommitmentShape;

const CommitmentModal: React.FC<Props> = ({closeModal, handleAddEdge}) => {

  return (
    <>
      <p>I am commitment Modal</p>
    </>
  );
}

export default CommitmentModal;