export type PalletNodeProps = {
  thing: any;
};

const PalletNode: React.FC<PalletNodeProps> = ({thing}) => {

  return (
      <div key={thing.id}>
        {thing.name}
      </div>
  );
};

export default PalletNode;