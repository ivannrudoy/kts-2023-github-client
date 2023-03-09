import React, { FC, HTMLAttributes } from "react";

import classNames from "classnames";

import styles from "./Card.module.scss";

export type CardProps = {
  img: string;
  name: string;
  onClick: () => void;
} & HTMLAttributes<HTMLDivElement>;

const Card: FC<CardProps> = ({
  className,
  img,
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
      <img className={styles.card__img} alt={name} src={img} />
      <div>
        <div className={styles.card__title}>{name}</div>
        {children}
      </div>
    </article>
  );
};

export default Card;
