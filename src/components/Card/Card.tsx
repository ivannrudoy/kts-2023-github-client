import React, { FC, HTMLAttributes, memo } from "react";

import StarYellow from "@assets/star_yellow.svg";
import classNames from "classnames";
import dayjs from "dayjs";

import styles from "./Card.module.scss";

export type CardProps = {
  img: string;
  name: string;
  login: string;
  stars: number;
  updated: string;
  onClick: () => void;
} & HTMLAttributes<HTMLDivElement>;

const formatDate = (d: string) => `${dayjs(d).format("DD MMM")}`;

const Card: FC<CardProps> = ({
  className,
  img,
  name,
  login,
  stars,
  updated,
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
        <div className={styles.card__stats}>
          <div className={styles.card__stars}>
            <img alt={stars.toString()} src={StarYellow} />
            {` ${stars}`}
          </div>
          <div className={styles.card__updated}>
            Updated {formatDate(updated)}
          </div>
        </div>
        {children}
      </div>
    </article>
  );
};

export default memo(Card);
