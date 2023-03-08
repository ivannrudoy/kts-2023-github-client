import React, { FC, HTMLAttributes } from "react";

type ItemProps = HTMLAttributes<HTMLDivElement> & {
  value: string;
};

export const Item: FC<ItemProps> = ({ value }) => {
  return <div data-value={value}>{value}</div>;
};

export default Item;
export { ItemProps };
