import React, { FC } from "react";

import Input from "@components/Input";

import styles from "./Input.module.scss";

type DropdownInputProps = {
  onClick: () => void;
  value: string;
  placeholder?: string;
};

export const DropdownInput: FC<DropdownInputProps> = ({
  value,
  onClick,
  placeholder = "",
}) => {
  return (
    <Input
      className={styles.dropdown__input}
      value={value}
      onClick={onClick}
      placeholder={placeholder}
      readOnly
    />
  );
};

export default DropdownInput;
export { DropdownInputProps };
