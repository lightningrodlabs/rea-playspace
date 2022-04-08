import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { WHO_AM_I } from "./graphql/queries";

export type MyAgentIdProps = {
  setMyAgentId: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const MyAgentId: React.FC<MyAgentIdProps> = ({ setMyAgentId }) => {
  const myAgentRequest = useQuery(WHO_AM_I);

  useEffect(() => {
    if (
      !myAgentRequest.loading &&
      !myAgentRequest.error &&
      myAgentRequest.data
    ) {
      const myAgentId = myAgentRequest.data.myAgent.id;
      setMyAgentId(myAgentId);
    }
  }, [
    myAgentRequest.data,
    myAgentRequest.error,
    myAgentRequest.loading,
    setMyAgentId,
  ]);

  if (myAgentRequest.loading) return <div>Checking my identity...</div>;
  if (myAgentRequest.error) return <p>ERROR checking my identity</p>;

  return <></>;
};

export default MyAgentId;