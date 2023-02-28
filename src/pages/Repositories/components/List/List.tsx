import * as React from "react";
import { HTMLAttributes } from "react";

import { useLocalStore } from "@hooks/useLocalStore";
import RepositoriesStore from "@store/RepositoriesStore";

type ListProps = {} & HTMLAttributes<HTMLDivElement>;

const List: React.FC<ListProps> = () => {
  const repositoriesStore = useLocalStore(() => new RepositoriesStore());

  return <></>;
};

export type { ListProps };
export default List;
