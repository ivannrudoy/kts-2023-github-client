import * as React from "react";
import { FC, HTMLAttributes, memo } from "react";

import List from "./components/List";
import Name from "./components/Name";
import Type from "./components/Type";
import styles from "./Repositories.module.scss";

type RepositoriesProps = {} & HTMLAttributes<HTMLDivElement>;

const Repositories: FC<RepositoriesProps> = () => {
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

export type { RepositoriesProps };
export default memo(Repositories);
