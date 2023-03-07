import React, { ChangeEvent, FC, InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  onChange: (ev: ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

export const Input: FC<InputProps> = ({ value, onChange }) => {
  return <input value={value} onChange={onChange} />;
};

export default Input;
export { InputProps };
