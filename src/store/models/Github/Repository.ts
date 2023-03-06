type RepositoryApi = {
  id: number;
  name: string;
  stargazers_count: number;
  updated_at: string;
};

type RepositoryModel = {
  id: number;
  name: string;
  stargazers_count: number;
  updated_at: string;
};

const getInitialRepositoryApi = (): RepositoryApi => ({
  id: -1,
  name: "",
  stargazers_count: -1,
  updated_at: "",
});

const normalizeRepository = (from: RepositoryApi): RepositoryModel => {
  return {
    id: from.id,
    name: from.name,
    stargazers_count: from.stargazers_count,
    updated_at: from.updated_at,
  };
};

const mapRepositoryApiModel = (from: RepositoryApi[]): RepositoryModel[] => {
  return from.map((el) => normalizeRepository(el));
};

export {
  RepositoryApi,
  RepositoryModel,
  getInitialRepositoryApi,
  normalizeRepository,
  mapRepositoryApiModel,
};
