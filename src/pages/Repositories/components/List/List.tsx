import * as React from "react";
import { HTMLAttributes } from "react";

import { useLocalStore } from "@hooks/useLocalStore";

type ListProps = {} & HTMLAttributes<HTMLDivElement>;

const List: React.FC<ListProps> = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const repositoriesStore = useLocalStore(() => null);

  return <></>;
};

export type { ListProps };
export default List;
