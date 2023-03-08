import React, { MouseEvent, FC, HTMLAttributes } from "react";

import Dropdown from "@components/Dropdown/Dropdown";

type TypeProps = {
  handleTypeClick: (ev: MouseEvent) => void;
} & HTMLAttributes<HTMLDivElement>;

const REPOSITORIES_TYPES = [
  "all",
  "public",
  "private",
  "forks",
  "sources",
  "member",
];

const Type: FC<TypeProps> = ({ handleTypeClick }) => {
  return (
    <div>
      <Dropdown handleItemClick={handleTypeClick} data={REPOSITORIES_TYPES} />
    </div>
  );
};

export default Type;
export type { TypeProps };
