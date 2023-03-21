import { useEffect } from "react";

import rootStore from "@store/RootStore";
import { useLocation, useSearchParams } from "react-router-dom";

export const useQueryParamsStoreInit = (): void => {
  const { pathname, search } = useLocation();
  let [_, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (search === "" && pathname === "/") {
      setSearchParams(
        new URLSearchParams({
          name: "ktsstudio",
          page: "1",
        })
      );
    }
    rootStore.query.setSearch(search);
  }, [search]);
};
