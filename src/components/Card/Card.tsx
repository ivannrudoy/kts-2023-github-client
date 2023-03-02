import React, { FC, HTMLAttributes } from "react";

import classNames from "classnames";

import styles from "./Card.module.scss";

export type CardProps = {
  name: string;
  onClick: () => void;
} & HTMLAttributes<HTMLDivElement>;

const Card: FC<CardProps> = ({
  className,
  name,
  onClick,
  children,
  ...attrs
}) => {
  return (
    <article
      className={classNames(className, styles.card)}
      onClick={onClick}
      {...attrs}
    >
      <div>{name}</div>
      {children}
    </article>
  );
};

export default Card;
