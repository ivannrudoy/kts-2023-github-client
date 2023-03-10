import * as React from "react";
import { HTMLAttributes, useEffect, useState } from "react";

import Card from "@components/Card";
import { RepositoryModel } from "@store/models/Github";
import RepositoriesStore from "@store/RepositoriesStore";
import rootStore from "@store/RootStore";
import { observer, useLocalStore } from "mobx-react-lite";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate, useSearchParams } from "react-router-dom";

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
  const [data, setData] = useState<RepositoryModel[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const repositoriesStore = useLocalStore(() => new RepositoriesStore());
  const queryStore = rootStore.query;
  const navigate = useNavigate();
  const handleNext = React.useCallback(() => {
    const p = queryStore.page + 1;
    setSearchParams(
      queryStore.changeSearchParam(searchParams, "page", p.toString())
    );
  }, [queryStore, setSearchParams, searchParams]);
  const handleItemClick = (name: string) => {
    navigate(`/repository/${queryStore.name}/${name}`);
  };
  useEffect(() => {
    setData([]);
  }, [queryStore.type]);
  useEffect(() => {
    if (data.length < 5 * queryStore.page) {
      for (let c = 1; c <= queryStore.page; c++) {
        repositoriesStore.getRepositories(
          5,
          c,
          queryStore.name,
          queryStore.type
        );
      }
    } else {
      repositoriesStore.getRepositories(
        5,
        queryStore.page,
        queryStore.name,
        queryStore.type
      );
    }
  }, [queryStore.page, queryStore.name, queryStore.type, repositoriesStore]);
  useEffect(() => {
    setData(data?.concat(repositoriesStore.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repositoriesStore.data]);
  return (
    <div>
      <InfiniteScroll
        next={handleNext}
        loader={<>Loading</>}
        dataLength={data.length}
        hasMore={true}
        height={500}
      >
        {data.map((repository: RepositoryModel) => (
          <Card
            key={repository.id}
            onClick={() => handleItemClick(repository.name)}
            img={repository.avatar_url}
            name={repository.name}
            login={repository.login}
            stars={repository.stargazers_count}
            updated={repository.updated_at}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export type { ListProps };
export default observer(List);
