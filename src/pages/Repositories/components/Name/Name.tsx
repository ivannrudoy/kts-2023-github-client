import React, { ChangeEvent, FC, HTMLAttributes } from "react";

import Button from "@components/Button";
import Input from "@components/Input";

import styles from "./Name.module.scss";

type NameProps = {
  handleNameInput: (ev: ChangeEvent<HTMLInputElement>) => void;
  handleNameClick: () => void;
  value: string;
} & HTMLAttributes<HTMLDivElement>;

const Name: FC<NameProps> = ({ handleNameInput, handleNameClick, value }) => {
  return (
    <div className={styles["repositories__name"]}>
      <Input
        className={styles["repositories__input"]}
        value={value}
        onChange={handleNameInput}
        placeholder="Enter organization name"
      />
      <Button onClick={handleNameClick} />
    </div>
  );
};

export default Name;
export type { NameProps };
