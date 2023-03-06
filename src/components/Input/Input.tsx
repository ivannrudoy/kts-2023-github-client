import React, { FC, InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  value: string;
};

export const Input: FC<InputProps> = ({ value }) => {
  return <input />;
};

export default Input;
export { InputProps };
