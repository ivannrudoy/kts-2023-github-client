import * as React from "react";
import { HTMLAttributes } from "react";

import { RepositoryModel } from "@store/models/Github";

type ListProps = {
  data: RepositoryModel[];
} & HTMLAttributes<HTMLDivElement>;

const List: React.FC<ListProps> = ({ data }) => {
  return (
    <>
      {data.map((repository: RepositoryModel) => (
        <div key={repository.id}>{repository.name}</div>
      ))}
    </>
  );
};

export type { ListProps };
export default List;
