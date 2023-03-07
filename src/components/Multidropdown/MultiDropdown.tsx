import React, { FC, HTMLAttributes } from "react";

type MultiDropownProps = HTMLAttributes<HTMLDivElement> & {
  data: string[];
};

export const MultiDropdown: FC<MultiDropownProps> = ({ data }) => {
  return <div></div>;
};

export default MultiDropdown;
export { MultiDropownProps };
