import * as React from "react";
import { HTMLAttributes, useCallback, useEffect, useState } from "react";

import RepositoriesStore from "@store/RepositoriesStore";
import { ResponseState } from "@utils/ResponseState";
import { observer, useLocalStore } from "mobx-react-lite";

import List from "./components/List";

type RepositoriesProps = {} & HTMLAttributes<HTMLDivElement>;

/**
 * @TODO Add loader
 */
const Repositories: React.FC<RepositoriesProps> = () => {
  const [page, setPage] = useState(1);

  const repositoriesStore = useLocalStore(() => new RepositoriesStore());

  const perPage = 5;

  const handleNext = useCallback(() => {
    setPage(page + 1);
  }, [page]);

  useEffect(() => {
    repositoriesStore.getRepositories(perPage, page);
  }, [page, repositoriesStore]);

  return (
    <div>
      {repositoriesStore.responseState !== ResponseState.SUCCESS ? (
        "Loading"
      ) : (
        <List
          handleNext={handleNext}
          data={repositoriesStore.data}
          count={repositoriesStore.data.length}
        />
      )}
    </div>
  );
};

export type { RepositoriesProps };
export default observer(Repositories);
