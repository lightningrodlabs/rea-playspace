import { ModelType } from "../../data/models/Application";

export type PalletNodeProps = {
  thing: any;
  type: ModelType;
  onClick: (event: any, id: string, type: ModelType) => void;
  onDoubleClick: (event: any, id: string, type: ModelType) => void;
};

const PalletNode: React.FC<PalletNodeProps> = ({thing, onClick, onDoubleClick, type}) => {

  return (
      <div 
        key={thing.id} 
        onClick={(event)=>onClick(event, thing.id, type)}
        onDoubleClick={(event)=>onDoubleClick(event, thing.id, type)}>
        {thing.name}
      </div>
  );
};

export default PalletNode;