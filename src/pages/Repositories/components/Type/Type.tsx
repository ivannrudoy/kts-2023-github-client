import React, { MouseEvent, FC, useCallback } from "react";

import Dropdown from "@components/Dropdown/Dropdown";
import { useQueryParamsStore } from "@store/RootStore";
import { observer } from "mobx-react-lite";
import { useSearchParams } from "react-router-dom";

import styles from "./Type.module.scss";

const REPOSITORIES_TYPES = [
  "all",
  "public",
  "private",
  "forks",
  "sources",
  "member",
];

const Type: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryStore = useQueryParamsStore();
  const handleTypeClick = useCallback(
    (ev: MouseEvent) => {
      const item = ev.target as HTMLDivElement;
      const value = item.dataset.value ?? "";
      queryStore.changeSearchParam(searchParams, "type", value);
      queryStore.changeSearchParam(searchParams, "page", "1");
      setSearchParams(searchParams);
    },
    [queryStore, searchParams, setSearchParams]
  );
  return (
    <div>
      <Dropdown
        className={styles["header__type"]}
        handleItemClick={handleTypeClick}
        data={REPOSITORIES_TYPES}
        placeholder={queryStore.type === "" ? "Type" : queryStore.type}
      />
    </div>
  );
};

export default observer(Type);
