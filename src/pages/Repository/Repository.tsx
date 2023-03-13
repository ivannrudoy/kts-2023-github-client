import * as React from "react";
import { HTMLAttributes, useEffect } from "react";

import { useLocalStore } from "@hooks/useLocalStore";
import READMEStore from "@store/READMEStore";
import RepositoryStore from "@store/RepositoryStore";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";

import View from "./components/View/View";

type RepositoryProps = {} & HTMLAttributes<HTMLDivElement>;

const Repository: React.FC<RepositoryProps> = () => {
  const { org = "", name = "" } = useParams();
  const repositoryStore = useLocalStore(() => new RepositoryStore());
  const readmeStore = useLocalStore(() => new READMEStore());

  useEffect(() => {
    repositoryStore.getRepository(org, name);
    readmeStore.getReadme(org, name);
  }, [repositoryStore, readmeStore, org, name]);

  // @TODO Add loader
  return (
    <View
      org={org}
      name={name}
      repository={repositoryStore.data}
      readme={readmeStore.data}
    />
  );
};

export default observer(Repository);
