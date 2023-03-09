import React, { MouseEvent, FC, InputHTMLAttributes } from "react";

import Input from "@components/Input";

type DropdownInputProps = InputHTMLAttributes<HTMLInputElement> & {
  onClick: (ev: MouseEvent<HTMLInputElement>) => void;
  value: string;
};

export const DropdownInput: FC<DropdownInputProps> = ({ value, onClick }) => {
  return <Input value={value} onChange={() => {}} onClick={onClick} disabled />;
};

export default DropdownInput;
export { DropdownInputProps };
