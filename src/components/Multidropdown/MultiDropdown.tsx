import React, { FC, HTMLAttributes } from "react";

import List from "./components/List";

type MultiDropownProps = HTMLAttributes<HTMLDivElement> & {
  data: string[];
};

export const MultiDropdown: FC<MultiDropownProps> = ({ data }) => {
  return (
    <div>
      <List data={data} />
    </div>
  );
};

export default MultiDropdown;
export { MultiDropownProps };
