import { useEffect } from "react";

import rootStore from "@store/RootStore";
import { useLocation } from "react-router-dom";

export const useQueryParamsStoreInit = (): void => {
  const { search } = useLocation();

  useEffect(() => {
    rootStore.query.setSearch(search);
  }, [search]);
};
