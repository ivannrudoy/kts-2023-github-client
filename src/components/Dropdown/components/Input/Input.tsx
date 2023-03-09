import React, { FC, InputHTMLAttributes } from "react";

import Input from "@components/Input";

type DropdownInputProps = InputHTMLAttributes<HTMLInputElement> & {
  onClick: () => void;
  value: string;
};

export const DropdownInput: FC<DropdownInputProps> = ({ value, onClick }) => {
  return <Input value={value} onClick={onClick} readOnly />;
};

export default DropdownInput;
export { DropdownInputProps };
