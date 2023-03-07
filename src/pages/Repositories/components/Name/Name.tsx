import React, { ChangeEvent, FC, HTMLAttributes } from "react";

import Button from "@components/Button";
import Input from "@components/Input";

type NameProps = {
  handleNameInput: (ev: ChangeEvent<HTMLInputElement>) => void;
  handleNameClick: () => void;
  value: string;
} & HTMLAttributes<HTMLDivElement>;

const Name: FC<NameProps> = ({ handleNameInput, handleNameClick, value }) => {
  return (
    <>
      <Input value={value} onChange={handleNameInput} />
      <Button onClick={handleNameClick} />
    </>
  );
};

export default Name;
export type { NameProps };
