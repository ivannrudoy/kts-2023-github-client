import React, { MouseEvent, FC, HTMLAttributes } from "react";

type ItemProps = HTMLAttributes<HTMLDivElement> & {
  handleItemClick: (ev: MouseEvent) => void;
  value: string;
};

export const Item: FC<ItemProps> = ({ value, handleItemClick }) => {
  return (
    <div data-value={value} onClick={handleItemClick}>
      {value}
    </div>
  );
};

export default Item;
export { ItemProps };
