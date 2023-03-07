import React, { MouseEvent, FC, InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  onClick: (ev: MouseEvent<HTMLInputElement>) => void;
  value: string;
};

export const Input: FC<InputProps> = ({ value, onClick }) => {
  return <input value={value} onClick={onClick} disabled />;
};

export default Input;
export { InputProps };
