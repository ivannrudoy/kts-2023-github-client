import { useEffect, useRef } from "react";

import { ILocalStore } from "@utils/ILocalStore";

export const useLocalStore = <T extends ILocalStore>(creator: () => T): T => {
  const container = useRef<null | T>(null);
  if (container.current === null) container.current = creator();

  useEffect(() => {
    return () => container.current?.destroy();
  }, []);

  return container.current;
};
