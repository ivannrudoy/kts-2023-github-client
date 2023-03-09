import React, { FC, HTMLAttributes } from "react";

import classNames from "classnames";

import styles from "./Card.module.scss";

export type CardProps = {
  img: string;
  name: string;
  login: string;
  stars: number;
  onClick: () => void;
} & HTMLAttributes<HTMLDivElement>;

const Card: FC<CardProps> = ({
  className,
  img,
  name,
  login,
  stars,
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
        <div className={styles.card__login}>{login}</div>
        <div>
          <div>{stars}</div>
        </div>
        {children}
      </div>
    </article>
  );
};

export default Card;
