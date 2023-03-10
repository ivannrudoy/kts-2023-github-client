import React, { MouseEvent, FC, HTMLAttributes } from "react";

import Dropdown from "@components/Dropdown/Dropdown";

import styles from "./Type.module.scss";

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
  return (
    <div>
      <Dropdown
        className={styles["header__type"]}
        // handleItemClick={handleTypeClick}
        handleItemClick={(ev: MouseEvent) => {}}
        data={REPOSITORIES_TYPES}
        placeholder="Type"
      />
    </div>
  );
};

export default Type;
export type { TypeProps };
