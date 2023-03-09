import * as React from "react";
import { HTMLAttributes, useCallback } from "react";

import Card from "@components/Card";
import { RepositoryModel } from "@store/models/Github";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";

type ListProps = {
  data: RepositoryModel[];
  handleNext: () => void;
  count: number;
} & HTMLAttributes<HTMLDivElement>;

const List: React.FC<ListProps> = ({ data, handleNext, count }) => {
  const navigate = useNavigate();

  const handleOnClick = useCallback(
    (name: string) => {
      navigate(`/repository/${name}`);
    },
    [navigate]
  );

  return (
    <div>
      <InfiniteScroll
        next={handleNext}
        loader={<>Loading</>}
        dataLength={count}
        hasMore={true}
        height={500}
      >
        {data.map((repository: RepositoryModel) => (
          <Card
            key={repository.id}
            onClick={() => handleOnClick(repository.name)}
            img={repository.avatar_url}
            name={repository.name}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export type { ListProps };
export default List;
