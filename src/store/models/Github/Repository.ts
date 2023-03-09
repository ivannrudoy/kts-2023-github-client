type RepositoryApi = {
  id: number;
  name: string;
  stargazers_count: number;
  updated_at: string;
  owner: {
    avatar_url: string;
  };
};

type RepositoryModel = {
  id: number;
  name: string;
  stargazers_count: number;
  updated_at: string;
  avatar_url: string;
};

const getInitialRepositoryApi = (): RepositoryApi => ({
  id: -1,
  name: "",
  stargazers_count: -1,
  updated_at: "",
  owner: {
    avatar_url: "",
  },
});

const normalizeRepository = (from: RepositoryApi): RepositoryModel => {
  return {
    id: from.id,
    name: from.name,
    stargazers_count: from.stargazers_count,
    updated_at: from.updated_at,
    avatar_url: from.owner.avatar_url,
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
