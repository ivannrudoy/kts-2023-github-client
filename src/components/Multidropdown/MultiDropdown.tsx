import React, { FC, HTMLAttributes } from "react";

import Input from "./components/Input";
import List from "./components/List";

type MultiDropownProps = HTMLAttributes<HTMLDivElement> & {
  data: string[];
};

export const MultiDropdown: FC<MultiDropownProps> = ({ data }) => {
  return (
    <div>
      <Input onClick={() => {}} value={""} />
      <List data={data} />
    </div>
  );
};

export default MultiDropdown;
export { MultiDropownProps };
