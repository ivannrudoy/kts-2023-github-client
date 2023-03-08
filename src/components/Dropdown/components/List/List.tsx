import React, { MouseEvent, FC, HTMLAttributes } from "react";

import Item from "../Item";

type ListProps = HTMLAttributes<HTMLDivElement> & {
  handleItemClick: (ev: MouseEvent) => void;
  data: string[];
};

export const List: FC<ListProps> = ({ data, handleItemClick }) => {
  return (
    <div>
      {data.map((el) => (
        <Item key={el} value={el} handleItemClick={handleItemClick} />
      ))}
    </div>
  );
};

export default List;
export { ListProps };
