import * as React from "react";
import { HTMLAttributes, useEffect } from "react";

import { useLocalStore } from "@hooks/useLocalStore";
import READMEStore from "@store/READMEStore";
import RepositoryStore from "@store/RepositoryStore";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";

type RepositoryProps = {} & HTMLAttributes<HTMLDivElement>;

const Repository: React.FC<RepositoryProps> = () => {
  const { org = "", name = "" } = useParams();
  const repositoryStore = useLocalStore(() => new RepositoryStore());
  const readmeStore = useLocalStore(() => new READMEStore());

  useEffect(() => {
    repositoryStore.getRepository(org, name);
    readmeStore.getReadme(org, name);
  }, [repositoryStore, readmeStore, org, name]);

  return <></>;
};

export default observer(Repository);
