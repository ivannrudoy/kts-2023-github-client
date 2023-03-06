import React, { FC, HTMLAttributes } from "react";

import Input from "@components/Input";

type NameProps = {} & HTMLAttributes<HTMLDivElement>;

const Name: FC<NameProps> = () => {
  return (
    <>
      <Input value={""} />
    </>
  );
};

export default Name;
export type { NameProps };
