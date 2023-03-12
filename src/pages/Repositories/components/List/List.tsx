import * as React from "react";
import { FC, useEffect, useState } from "react";

import Card from "@components/Card";
import { RepositoryModel } from "@store/models/Github";
import RepositoriesStore from "@store/RepositoriesStore";
import RepositoriesStoreMul from "@store/RepositoriesStoreMul";
import rootStore from "@store/RootStore";
import { ResponseState } from "@utils/ResponseState";
import { observer, useLocalStore } from "mobx-react-lite";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loader from "@components/Loader";

const List: FC = () => {
  const [data, setData] = useState<RepositoryModel[]>([]);
  const [load, setLoad] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const repositoriesStore = useLocalStore(() => new RepositoriesStore());
  const repositoriesStoreMul = useLocalStore(() => new RepositoriesStoreMul());
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
    if (data.length < 1 && queryStore.page > 1) {
      repositoriesStoreMul.getRepositories(
        5,
        queryStore.page,
        queryStore.name,
        queryStore.type
      );
    } else {
      repositoriesStore.getRepositories(
        5,
        queryStore.page,
        queryStore.name,
        queryStore.type
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryStore.page, queryStore.name, queryStore.type]);
  useEffect(() => {
    if (repositoriesStoreMul.responseState === ResponseState.FULL_LOAD) {
      setData(data.concat(repositoriesStoreMul.data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repositoriesStoreMul.responseState]);
  useEffect(() => {
    setData(data.concat(repositoriesStore.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repositoriesStore.data]);
  useEffect(() => {
    if (
      repositoriesStore.responseState === ResponseState.SUCCESS ||
      repositoriesStoreMul.responseState === ResponseState.FULL_LOAD
    ) {
      setLoad(true);
    } else {
      setLoad(false);
    }
  }, [repositoriesStore.responseState, repositoriesStoreMul.responseState]);
  return (
    <div>
      {!load && <Loader />}
      <InfiniteScroll
        next={handleNext}
        loader={data.length !== 0 && <>Loading</>}
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

export default observer(List);
