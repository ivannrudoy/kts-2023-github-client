import * as React from "react";
import { HTMLAttributes, useEffect } from "react";

import { useLocalStore } from "@hooks/useLocalStore";
import RepositoriesStore from "@store/RepositoriesStore";

type ListProps = {} & HTMLAttributes<HTMLDivElement>;

const List: React.FC<ListProps> = () => {
  const repositoriesStore = useLocalStore(() => new RepositoriesStore());

  useEffect(() => {
    repositoriesStore.getRepositories();
  }, [repositoriesStore]);

  return <></>;
};

export type { ListProps };
export default List;
