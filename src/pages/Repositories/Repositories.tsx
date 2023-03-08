import * as React from "react";
import {
  MouseEvent,
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
import Type from "./components/Type";

type RepositoriesProps = {} & HTMLAttributes<HTMLDivElement>;

/**
 * @TODO Add loader
 */
const Repositories: React.FC<RepositoriesProps> = () => {
  const [inputValue, setInputValue] = useState<string>();
  const [typeValue, setTypeValue] = useState<string>();
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
    if (typeof inputValue !== "undefined" && inputValue !== queryStore.name) {
      repositoriesStore.resetData();
    }
    const sp = searchParams;
    queryStore.changeSearchParam(sp, "name", inputValue ?? queryStore.name);
    setSearchParams(
      queryStore.changeSearchParam(
        sp,
        "page",
        typeof inputValue === "undefined" ? `${queryStore.page}` : "1"
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
  const handleTypeClick = useCallback(
    (ev: MouseEvent) => {
      const item = ev.target as HTMLDivElement;
      const value = item.dataset.value ?? "";
      setSearchParams(
        queryStore.changeSearchParam(searchParams, "type", value)
      );
    },
    [queryStore, searchParams, setSearchParams]
  );

  useEffect(() => {
    repositoriesStore.getRepositories(
      perPage,
      queryStore.page,
      queryStore.name,
      queryStore.type
    );
  }, [queryStore.page, queryStore.name, queryStore.type, repositoriesStore]);

  // @TODO: Move to view
  return (
    <div>
      <>
        <Name
          handleNameClick={handleNameClick}
          handleNameInput={handleNameInput}
          value={inputValue ?? queryStore.name}
        />
        <div>
          <>Repositories</>
          <Type handleTypeClick={handleTypeClick} />
        </div>
        {repositoriesStore.responseState !== ResponseState.SUCCESS ? (
          "Loading"
        ) : (
          <List
            handleNext={handleNext}
            data={repositoriesStore.data}
            count={repositoriesStore.data.length}
          />
        )}
      </>
    </div>
  );
};

export type { RepositoriesProps };
export default observer(Repositories);
