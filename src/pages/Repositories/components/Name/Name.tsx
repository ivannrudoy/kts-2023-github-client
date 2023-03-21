import React, { ChangeEvent, FC, useCallback, useState } from "react";

import Button from "@components/Button";
import Input from "@components/Input";
import rootStore from "@store/RootStore";
import { observer } from "mobx-react-lite";
import { useSearchParams } from "react-router-dom";

import styles from "./Name.module.scss";

const Name: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState<string>();
  const [prevName, setPrevName] = useState<string>();
  const queryStore = rootStore.query;
  const handleNameInput = (ev: ChangeEvent<HTMLInputElement>) => {
    setInputValue(ev.target.value ?? queryStore.name);
  };
  const handleNameClick = useCallback(() => {
    const sp = searchParams;
    const name = inputValue ?? queryStore.name;

    queryStore.changeSearchParam(sp, "name", name);

    if (prevName !== name) {
      setPrevName(name);
      queryStore.changeSearchParam(sp, "page", "1");
    } else {
      queryStore.changeSearchParam(
        sp,
        "page",
        `${queryStore.page === -1 ? 1 : queryStore.page}`
      );
    }
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
