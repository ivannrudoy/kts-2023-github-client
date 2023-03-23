import * as React from "react";
import { FC, useEffect, useState } from "react";

import Card from "@components/Card";
import Loader, { Size } from "@components/Loader";
import { RepositoryModel } from "@store/models/Github";
import RepositoriesStore from "@store/RepositoriesStore";
import RepositoriesStoreBatch from "@store/RepositoriesStoreBatch";
import { useQueryParamsStore } from "@store/RootStore";
import { ResponseState } from "@utils/ResponseState";
import { observer, useLocalStore } from "mobx-react-lite";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate, useSearchParams } from "react-router-dom";

import Error from "../Error";

const List: FC = () => {
  const [data, setData] = useState<RepositoryModel[]>([]);
  const [load, setLoad] = useState<boolean>(false);
  const [prevName, setPrevName] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams();
  const repositoriesStore = useLocalStore(() => new RepositoriesStore());
  const repositoriesStoreBatch = useLocalStore(
    () => new RepositoriesStoreBatch()
  );
  const queryStore = useQueryParamsStore();
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
    if (prevName !== queryStore.name) {
      setPrevName(queryStore.name);
      setData([]);
    }
    const store =
      data.length < 1 && queryStore.page > 1
        ? repositoriesStoreBatch
        : repositoriesStore;
    store.getRepositories(5, queryStore.page, queryStore.name, queryStore.type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryStore.page, queryStore.name, queryStore.type]);
  useEffect(() => {
    if (
      repositoriesStoreBatch.responseStateBatch === ResponseState.BATCH_SUCCESS
    ) {
      setData(data.concat(repositoriesStoreBatch.data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repositoriesStoreBatch.responseStateBatch]);
  useEffect(() => {
    setData(data.concat(repositoriesStore.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repositoriesStore.data]);
  useEffect(() => {
    if (
      repositoriesStoreBatch.responseStateBatch === ResponseState.BATCH_LOADING
    ) {
      setLoad(true);
    } else {
      setLoad(false);
    }
  }, [repositoriesStoreBatch.responseStateBatch]);
  return (
    <div>
      {load ? (
        <Loader />
      ) : (
        (repositoriesStore.responseState === ResponseState.SUCCESS ||
          repositoriesStoreBatch.responseStateBatch ===
            ResponseState.BATCH_SUCCESS) &&
        data.length === 0 && (
          <Error message="No items to display, change type or org name" />
        )
      )}
      {(repositoriesStore.responseState === ResponseState.ERROR_NOT_FOUND ||
        repositoriesStoreBatch.responseState ===
          ResponseState.ERROR_NOT_FOUND) && (
        <Error message="Cannot found the organization" />
      )}
      <InfiniteScroll
        next={handleNext}
        loader={data.length !== 0 && <Loader size={Size.s} />}
        dataLength={data.length}
        hasMore={true}
        height={500}
      >
        {data.map((repository: RepositoryModel) => (
          <Card
            key={repository.id + queryStore.type}
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
