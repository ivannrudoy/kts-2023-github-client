import React, { FC, HTMLAttributes } from "react";

import MultiDropdown from "@components/Multidropdown/MultiDropdown";

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
      <MultiDropdown data={REPOSITORIES_TYPES} />
    </div>
  );
};

export default Type;
export type { TypeProps };
