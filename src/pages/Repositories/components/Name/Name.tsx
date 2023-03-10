import React, {
  ChangeEvent,
  FC,
  HTMLAttributes,
  memo,
  useCallback,
  useState,
} from "react";

import Button from "@components/Button";
import Input from "@components/Input";
import rootStore from "@store/RootStore";
import { observer } from "mobx-react-lite";
import { useSearchParams } from "react-router-dom";

import styles from "./Name.module.scss";

type NameProps = {
  // handleNameInput: (ev: ChangeEvent<HTMLInputElement>) => void;
  // handleNameClick: () => void;
  // value: string;
} & HTMLAttributes<HTMLDivElement>;

// const Name: FC<NameProps> = ({ handleNameInput, handleNameClick, value }) => {
const Name: FC<NameProps> = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState<string>();
  const queryStore = rootStore.query;
  const handleNameInput = (ev: ChangeEvent<HTMLInputElement>) => {
    setInputValue(ev.target.value ?? queryStore.name);
  };
  const handleNameClick = useCallback(() => {
    const sp = searchParams;
    queryStore.changeSearchParam(sp, "name", inputValue ?? queryStore.name);
    setSearchParams(sp);
  }, [inputValue, queryStore, searchParams, setSearchParams]);
  return (
    <div className={styles["repositories__name"]}>
      <Input
        className={styles["repositories__input"]}
        value={inputValue ?? queryStore.name}
        onChange={handleNameInput}
        placeholder="Enter organization name"
      />
      <Button onClick={handleNameClick} />
    </div>
  );
};

export default observer(Name);
export type { NameProps };
