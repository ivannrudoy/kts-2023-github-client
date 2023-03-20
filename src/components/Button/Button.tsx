import React, { FC } from "react";

import styles from "./Button.module.scss";

type ButtonProps = {
  onClick: () => void;
};

export const Button: FC<ButtonProps> = ({ onClick }) => {
  return <button className={styles["button"]} onClick={onClick} />;
};

export type { ButtonProps };
export default Button;
