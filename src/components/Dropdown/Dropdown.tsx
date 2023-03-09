import React, { MouseEvent, FC, HTMLAttributes, useState } from "react";

import Input from "./components/Input";
import List from "./components/List";

type DropownProps = HTMLAttributes<HTMLDivElement> & {
  handleItemClick: (ev: MouseEvent) => void;
  data: string[];
  className: string;
  placeholder?: string;
};

export const Dropdown: FC<DropownProps> = ({
  data,
  handleItemClick,
  className,
  placeholder = "",
}) => {
  const [isHidden, setHidden] = useState<boolean>(true);
  const inputClick = () => {
    setHidden(!isHidden);
  };
  return (
    <div className={className}>
      <Input onClick={inputClick} value={""} placeholder={placeholder} />
      <List data={data} handleItemClick={handleItemClick} isHidden={isHidden} />
    </div>
  );
};

export default Dropdown;
export { DropownProps };
