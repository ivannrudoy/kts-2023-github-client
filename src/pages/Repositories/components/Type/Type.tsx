import React, { FC, HTMLAttributes } from "react";

import MultiDropdown from "@components/Multidropdown/MultiDropdown";

type TypeProps = {} & HTMLAttributes<HTMLDivElement>;

const Type: FC<TypeProps> = () => {
  return (
    <div>
      <MultiDropdown />
    </div>
  );
};

export default Type;
export type { TypeProps };
