import React, { MouseEvent, FC, HTMLAttributes, useState } from "react";

import Input from "./components/Input";
import List from "./components/List";

type DropownProps = HTMLAttributes<HTMLDivElement> & {
  handleItemClick: (ev: MouseEvent) => void;
  data: string[];
  className: string;
};

export const Dropdown: FC<DropownProps> = ({
  data,
  handleItemClick,
  className,
}) => {
  const [isHidden, setHidden] = useState<boolean>(true);
  const inputClick = () => {
    setHidden(!isHidden);
  };
  return (
    <div className={className}>
      <Input onClick={inputClick} value={""} />
      <List data={data} handleItemClick={handleItemClick} isHidden={isHidden} />
    </div>
  );
};

export default Dropdown;
export { DropownProps };
