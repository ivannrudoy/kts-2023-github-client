import React, { FC, HTMLAttributes } from "react";

import Input from "./components/Input";
import List from "./components/List";

type DropownProps = HTMLAttributes<HTMLDivElement> & {
  handleItemClick: () => void;
  data: string[];
};

export const Dropdown: FC<DropownProps> = ({ data }) => {
  return (
    <div>
      <Input onClick={() => {}} value={""} />
      <List data={data} />
    </div>
  );
};

export default Dropdown;
export { DropownProps };
