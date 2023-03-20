import { RefObject, useEffect } from "react";

const useOutsideClick = function <T extends HTMLElement>(
  ref: RefObject<T>,
  cb: () => void
) {
  useEffect(() => {
    const handleOutsideClick = function (event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        cb();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useOutsideClick;
