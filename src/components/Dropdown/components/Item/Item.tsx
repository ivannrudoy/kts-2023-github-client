import React, { MouseEvent, FC, HTMLAttributes } from "react";

import styles from "./Item.module.scss";

type ItemProps = HTMLAttributes<HTMLDivElement> & {
  handleItemClick: (ev: MouseEvent) => void;
  value: string;
};

export const Item: FC<ItemProps> = ({ value, handleItemClick }) => {
  return (
    <div
      className={styles.dropdown__item}
      data-value={value}
      onClick={handleItemClick}
    >
      {value}
    </div>
  );
};

export default Item;
export { ItemProps };
