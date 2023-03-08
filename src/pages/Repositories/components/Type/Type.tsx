import React, { FC, HTMLAttributes } from "react";

import Dropdown from "@components/Dropdown/Dropdown";

type TypeProps = {} & HTMLAttributes<HTMLDivElement>;

const REPOSITORIES_TYPES = [
  "all",
  "public",
  "private",
  "forks",
  "sources",
  "member",
];

const Type: FC<TypeProps> = () => {
  const handleItemClick = () => {};
  return (
    <div>
      <Dropdown handleItemClick={handleItemClick} data={REPOSITORIES_TYPES} />
    </div>
  );
};

export default Type;
export type { TypeProps };
