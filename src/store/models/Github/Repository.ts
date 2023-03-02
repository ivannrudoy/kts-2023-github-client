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

const normalizeRepository = (from: RepositoryApi): RepositoryModel => {
  return {
    id: from.id,
    name: from.name,
    stargazers_count: from.stargazers_count,
    updated_at: from.updated_at,
  };
};

export { RepositoryApi, RepositoryModel, normalizeRepository };
