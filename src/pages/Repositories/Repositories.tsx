import * as React from "react";
import { HTMLAttributes, memo, useEffect } from "react";

import RepositoriesStore from "@store/RepositoriesStore";
import { ResponseState } from "@utils/ResponseState";
import { observer, useLocalStore } from "mobx-react-lite";

import List from "./components/List";

type RepositoriesProps = {} & HTMLAttributes<HTMLDivElement>;

const Repositories: React.FC<RepositoriesProps> = () => {
  const repositoriesStore = useLocalStore(() => new RepositoriesStore());
  const perPage = 5;
  const page = 1;

  useEffect(() => {
    repositoriesStore.getRepositories(perPage, page);
  }, [repositoriesStore]);

  return (
    <div>
      {repositoriesStore.responseState === ResponseState.LOADING ? (
        "Loading"
      ) : (
        <List data={repositoriesStore.data} />
      )}
    </div>
  );
};

export type { RepositoriesProps };
export default observer(Repositories);
