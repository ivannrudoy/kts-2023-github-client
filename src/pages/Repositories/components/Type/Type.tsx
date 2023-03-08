import React, { FC, HTMLAttributes } from "react";

import Dropdown from "@components/Multidropdown/Dropdown";

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
  return (
    <div>
      <Dropdown data={REPOSITORIES_TYPES} />
    </div>
  );
};

export default Type;
export type { TypeProps };
