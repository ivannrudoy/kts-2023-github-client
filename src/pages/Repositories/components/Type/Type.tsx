import React, { MouseEvent, FC, HTMLAttributes, useCallback } from "react";
import rootStore from "@store/RootStore";

import Dropdown from "@components/Dropdown/Dropdown";

import styles from "./Type.module.scss";
import { useSearchParams } from "react-router-dom";
import { observer } from "mobx-react-lite";

type TypeProps = {
} & HTMLAttributes<HTMLDivElement>;

const REPOSITORIES_TYPES = [
  "all",
  "public",
  "private",
  "forks",
  "sources",
  "member",
];

const Type: FC<TypeProps> = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryStore = rootStore.query;
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
export type { TypeProps };
