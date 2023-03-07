import * as React from "react";
import {
  ChangeEvent,
  HTMLAttributes,
  useCallback,
  useEffect,
  useState,
} from "react";

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
  const [inputValue, setInputValue] = useState<string>();
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
  const handleNameClick = useCallback(() => {
    repositoriesStore.resetData();
    const sp = searchParams;
    queryStore.changeSearchParam(sp, "name", inputValue ?? queryStore.name);
    setSearchParams(
      queryStore.changeSearchParam(
        sp,
        "page",
        inputValue === queryStore.name ? `${queryStore.page}` : "1"
      )
    );
  }, [
    repositoriesStore,
    queryStore,
    setSearchParams,
    searchParams,
    inputValue,
  ]);
  const handleNameInput = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      setInputValue(ev.target.value ?? queryStore.name);
    },
    [queryStore]
  );

  useEffect(() => {
    repositoriesStore.getRepositories(
      perPage,
      queryStore.page,
      queryStore.name
    );
  }, [queryStore.page, queryStore.name, repositoriesStore]);

  return (
    <div>
      {repositoriesStore.responseState !== ResponseState.SUCCESS ? (
        "Loading"
      ) : (
        <>
          <Name
            handleNameClick={handleNameClick}
            handleNameInput={handleNameInput}
            value={inputValue ?? queryStore.name}
          />
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
