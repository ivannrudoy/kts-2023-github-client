import * as React from "react";
import { HTMLAttributes } from "react";

import { useLocalStore } from "@hooks/useLocalStore";
import RepositoryStore from "@store/RepositoryStore";
import { useParams } from "react-router-dom";

type RepositoryProps = {} & HTMLAttributes<HTMLDivElement>;

const Repository: React.FC<RepositoryProps> = () => {
  const { id = "" } = useParams();
  const repositoryStore = useLocalStore(() => new RepositoryStore());

  return <></>;
};

export default Repository;
