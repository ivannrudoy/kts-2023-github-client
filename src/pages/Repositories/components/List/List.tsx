import * as React from "react";
import { HTMLAttributes } from "react";

import Card from "@components/Card";
import { RepositoryModel } from "@store/models/Github";
import InfiniteScroll from "react-infinite-scroll-component";

type ListProps = {
  // data: RepositoryModel[];
  // handleOnClick: (name: string) => void;
  // handleNext: () => void;
  // count: number;
} & HTMLAttributes<HTMLDivElement>;

// const List: React.FC<ListProps> = ({
//   data,
//   handleNext,
//   handleOnClick,
//   count,
// }) => {
const List: React.FC<ListProps> = () => {
  return (
    <div>
      <InfiniteScroll
        // next={handleNext}
        next={() => {}}
        loader={<>Loading</>}
        // dataLength={count}
        dataLength={0}
        hasMore={true}
        height={500}
      >
        {/* {data.map((repository: RepositoryModel) => (
          <Card
            key={repository.id}
            onClick={() => handleOnClick(repository.name)}
            img={repository.avatar_url}
            name={repository.name}
            login={repository.login}
            stars={repository.stargazers_count}
            updated={repository.updated_at}
          />
        ))} */}
      </InfiniteScroll>
    </div>
  );
};

export type { ListProps };
export default React.memo(List);
