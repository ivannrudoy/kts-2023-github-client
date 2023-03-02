import * as React from "react";
import { HTMLAttributes } from "react";

import { useParams } from "react-router-dom";

type RepositoryProps = {} & HTMLAttributes<HTMLDivElement>;

const Repository: React.FC<RepositoryProps> = () => {
  const { id = "" } = useParams();

  return <></>;
};

export default Repository;
