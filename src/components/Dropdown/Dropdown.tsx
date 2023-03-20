import useOutsideClick from "@hooks/useOutsideClick";
import React, { MouseEvent, FC, HTMLAttributes, useState, useRef } from "react";

import Input from "./components/Input";
import List from "./components/List";

type DropownProps = HTMLAttributes<HTMLDivElement> & {
  handleItemClick: (ev: MouseEvent) => void;
  data: string[];
  className: string;
  placeholder?: string;
};

// @TODO Handle close on click outside
export const Dropdown: FC<DropownProps> = ({
  data,
  handleItemClick,
  className,
  placeholder = "",
}) => {
  const dropdownRef = useRef(null);
  const [isHidden, setHidden] = useState<boolean>(true);
  const [value, setValue] = useState<string>("");
  const inputClick = () => {
    setHidden(!isHidden);
  };
  const handleItem = (ev: MouseEvent) => {
    const i = ev.target as HTMLDivElement;
    setValue(i.dataset.value ?? "");
    handleItemClick(ev);
  };
  const handleOutsideClick = () => {
    setHidden(true);
  };
  useOutsideClick(dropdownRef, handleOutsideClick);
  return (
    <div className={className} ref={dropdownRef}>
      <Input onClick={inputClick} value={value} placeholder={placeholder} />
      <List data={data} handleItemClick={handleItem} isHidden={isHidden} />
    </div>
  );
};

export default Dropdown;
export { DropownProps };
