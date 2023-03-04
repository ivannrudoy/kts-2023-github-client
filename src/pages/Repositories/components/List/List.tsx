import * as React from "react";
import { HTMLAttributes, useCallback } from "react";

import Card from "@components/Card";
import { RepositoryModel } from "@store/models/Github";
import { useNavigate } from "react-router-dom";

type ListProps = {
  data: RepositoryModel[];
} & HTMLAttributes<HTMLDivElement>;

const List: React.FC<ListProps> = ({ data }) => {
  const navigate = useNavigate();

  const handleOnClick = useCallback(
    (name: string) => {
      navigate(`/repository/${name}`);
    },
    [navigate]
  );

  return (
    <>
      {data.map((repository: RepositoryModel) => (
        <Card
          key={repository.id}
          onClick={() => handleOnClick(repository.name)}
          name={repository.name}
        />
      ))}
    </>
  );
};

export type { ListProps };
export default List;
