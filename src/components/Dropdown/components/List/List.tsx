import React, { MouseEvent, FC, HTMLAttributes } from "react";

import classNames from "classnames";

import Item from "../Item";
import styles from "./List.module.scss";

type ListProps = HTMLAttributes<HTMLDivElement> & {
  handleItemClick: (ev: MouseEvent) => void;
  data: string[];
  isHidden?: boolean;
};

export const List: FC<ListProps> = ({
  data,
  handleItemClick,
  isHidden = true,
}) => {
  return (
    <div className={classNames(isHidden && styles["dropdown__list_hidden"])}>
      {data.map((el) => (
        <Item key={el} value={el} handleItemClick={handleItemClick} />
      ))}
    </div>
  );
};

export default List;
export { ListProps };
