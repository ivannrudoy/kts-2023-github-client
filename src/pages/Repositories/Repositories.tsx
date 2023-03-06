import * as React from "react";
import { HTMLAttributes, useCallback, useEffect, useState } from "react";

import RepositoriesStore from "@store/RepositoriesStore";
import rootStore from "@store/RootStore";
import { ResponseState } from "@utils/ResponseState";
import { observer, useLocalStore } from "mobx-react-lite";
import { useSearchParams } from "react-router-dom";

import List from "./components/List";
import Name from "./components/Name";

type RepositoriesProps = {} & HTMLAttributes<HTMLDivElement>;

/**
 * @TODO Add loader
 */
const Repositories: React.FC<RepositoriesProps> = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const repositoriesStore = useLocalStore(() => new RepositoriesStore());
  const queryStore = rootStore.query;

  const perPage = 5;

  const handleNext = useCallback(() => {
    const p = queryStore.page + 1;
    setSearchParams(
      queryStore.changeSearchParam(searchParams, "page", p.toString())
    );
  }, [queryStore, setSearchParams, searchParams]);

  useEffect(() => {
    repositoriesStore.getRepositories(perPage, queryStore.page);
  }, [queryStore.page, repositoriesStore]);

  return (
    <div>
      {repositoriesStore.responseState !== ResponseState.SUCCESS ? (
        "Loading"
      ) : (
        <>
          <Name />
          <List
            handleNext={handleNext}
            data={repositoriesStore.data}
            count={repositoriesStore.data.length}
          />
        </>
      )}
    </div>
  );
};

export type { RepositoriesProps };
export default observer(Repositories);
