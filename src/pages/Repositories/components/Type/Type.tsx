import React, { MouseEvent, FC, HTMLAttributes, useCallback } from "react";
import rootStore from "@store/RootStore";

import Dropdown from "@components/Dropdown/Dropdown";

import styles from "./Type.module.scss";
import { useSearchParams } from "react-router-dom";

type TypeProps = {
  // handleTypeClick: (ev: MouseEvent) => void;
} & HTMLAttributes<HTMLDivElement>;

const REPOSITORIES_TYPES = [
  "all",
  "public",
  "private",
  "forks",
  "sources",
  "member",
];

// const Type: FC<TypeProps> = ({ handleTypeClick }) => {
const Type: FC<TypeProps> = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryStore = rootStore.query;
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
  return (
    <div>
      <Dropdown
        className={styles["header__type"]}
        handleItemClick={handleTypeClick}
        data={REPOSITORIES_TYPES}
        placeholder="Type"
      />
    </div>
  );
};

export default Type;
export type { TypeProps };
