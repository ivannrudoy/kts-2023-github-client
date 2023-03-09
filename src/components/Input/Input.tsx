import classNames from "classnames";
import React, { ChangeEvent, FC, InputHTMLAttributes } from "react";

import styles from "./Input.module.scss";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  value: string;
  className?: string;
  onChange?: (ev: ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
};

export const Input: FC<InputProps> = ({
  value,
  onChange,
  className,
  ...attrs
}) => {
  return (
    <input
      className={classNames(className, styles["input"])}
      value={value}
      onChange={onChange}
      {...attrs}
    />
  );
};

export default Input;
export { InputProps };
