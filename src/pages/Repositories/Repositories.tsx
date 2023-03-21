import * as React from "react";
import { FC, memo } from "react";

import List from "./components/List";
import Name from "./components/Name";
import Type from "./components/Type";
import styles from "./Repositories.module.scss";

const Repositories: FC = () => {
  return (
    <div>
      <header className={styles.header}>
        <Name />
        <div className={styles["header__bottom"]}>
          <h1 className={styles["header__title"]}>Repositories</h1>
          <Type />
        </div>
      </header>
      <main>
        <List />
      </main>
    </div>
  );
};

export default memo(Repositories);
