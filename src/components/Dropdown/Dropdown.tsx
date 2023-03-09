import React, { MouseEvent, FC, HTMLAttributes } from "react";

import Input from "./components/Input";
import List from "./components/List";

type DropownProps = HTMLAttributes<HTMLDivElement> & {
  handleItemClick: (ev: MouseEvent) => void;
  data: string[];
};

export const Dropdown: FC<DropownProps> = ({ data, handleItemClick }) => {
  const inputClick = () => {
    console.log("click");
  };
  return (
    <div>
      <Input onClick={inputClick} value={""} />
      <List data={data} handleItemClick={handleItemClick} />
    </div>
  );
};

export default Dropdown;
export { DropownProps };
