import * as React from "react";
import { HTMLAttributes, memo } from "react";

import List from "./components/List";

type RepositoriesProps = {} & HTMLAttributes<HTMLDivElement>;

const Repositories: React.FC<RepositoriesProps> = () => {
  return (
    <div>
      <List />
    </div>
  );
};

export type { RepositoriesProps };
export default memo(Repositories);
