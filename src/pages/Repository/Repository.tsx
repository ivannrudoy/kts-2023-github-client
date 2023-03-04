import * as React from "react";
import { HTMLAttributes, useEffect } from "react";

import { useLocalStore } from "@hooks/useLocalStore";
import RepositoryStore from "@store/RepositoryStore";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";

type RepositoryProps = {} & HTMLAttributes<HTMLDivElement>;

const Repository: React.FC<RepositoryProps> = () => {
  const { name = "" } = useParams();
  const repositoryStore = useLocalStore(() => new RepositoryStore());

  useEffect(() => {
    repositoryStore.getRepository(name);
  }, [repositoryStore, name]);

  return <></>;
};

export default observer(Repository);
