import React, { FC, HTMLAttributes } from "react";

import Button from "@components/Button";
import Input from "@components/Input";

type NameProps = {} & HTMLAttributes<HTMLDivElement>;

const Name: FC<NameProps> = () => {
  return (
    <>
      <Input value={""} />
      <Button />
    </>
  );
};

export default Name;
export type { NameProps };
