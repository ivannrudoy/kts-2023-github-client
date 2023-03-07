import React, { ButtonHTMLAttributes, FC } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<ButtonProps> = ({ onClick }) => {
  return <button onClick={onClick} />;
};

export type { ButtonProps };
export default Button;
