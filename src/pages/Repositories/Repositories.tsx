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
import { useNavigate, useSearchParams } from "react-router-dom";

import List from "./components/List";
import Name from "./components/Name";
import Type from "./components/Type";
import styles from "./Repositories.module.scss";

type RepositoriesProps = {} & HTMLAttributes<HTMLDivElement>;

/**
 * @TODO Add loader
 */
const Repositories: React.FC<RepositoriesProps> = () => {
  const navigate = useNavigate();
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
      repositoriesStore.resetData();
      const item = ev.target as HTMLDivElement;
      const value = item.dataset.value ?? "";
      setSearchParams(
        queryStore.changeSearchParam(searchParams, "type", value)
      );
    },
    [queryStore, repositoriesStore, searchParams, setSearchParams]
  );
  const handleItemClick = (name: string) => {
    navigate(`/repository/${queryStore.name}/${name}`);
  };

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
      <header className={styles.header}>
        <Name
          handleNameClick={handleNameClick}
          handleNameInput={handleNameInput}
          value={inputValue ?? queryStore.name}
        />
        <div className={styles["header__bottom"]}>
          <h1 className={styles["header__title"]}>Repositories</h1>
          <Type handleTypeClick={handleTypeClick} />
        </div>
      </header>
      <main>
        {repositoriesStore.responseState !== ResponseState.SUCCESS ? (
          <></>
        ) : (
          <List
            handleNext={handleNext}
            handleOnClick={handleItemClick}
            data={repositoriesStore.data}
            count={repositoriesStore.data.length}
          />
        )}
      </main>
    </div>
  );
};

export type { RepositoriesProps };
export default observer(Repositories);
