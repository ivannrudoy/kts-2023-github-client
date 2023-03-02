import * as React from "react";
import { HTMLAttributes, memo, useEffect } from "react";

import RepositoriesStore from "@store/RepositoriesStore";
import { ResponseState } from "@utils/ResponseState";
import { useLocalStore } from "mobx-react-lite";

import List from "./components/List";

type RepositoriesProps = {} & HTMLAttributes<HTMLDivElement>;

const Repositories: React.FC<RepositoriesProps> = () => {
  const repositoriesStore = useLocalStore(() => new RepositoriesStore());

  useEffect(() => {
    repositoriesStore.getRepositories();
  }, [repositoriesStore]);

  return (
    <div>
      {repositoriesStore.responseState === ResponseState.LOADING ? (
        "Loading"
      ) : (
        <List data={repositoriesStore.list} />
      )}
    </div>
  );
};

export type { RepositoriesProps };
export default memo(Repositories);
