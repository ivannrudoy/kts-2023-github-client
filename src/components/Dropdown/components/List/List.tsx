import React, { FC, HTMLAttributes } from "react";

import Item from "../Item";

type ListProps = HTMLAttributes<HTMLDivElement> & {
  data: string[];
};

export const List: FC<ListProps> = ({ data }) => {
  return (
    <div>
      {data.map((el) => (
        <Item value={el} />
      ))}
    </div>
  );
};

export default List;
export { ListProps };
