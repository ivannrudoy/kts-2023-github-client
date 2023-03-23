import React, { FC } from "react";

import styles from "./Error.module.scss";

type ErrorProps = {
  message: string;
};

const Error: FC<ErrorProps> = ({ message }) => {
  return (
    <div className={styles.error}>
      <div className={styles.error__header}>Error</div>
      <div className={styles.error__body}>{message}</div>
    </div>
  );
};

export default Error;
export type { ErrorProps };
