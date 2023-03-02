type RepositoryApi = {
  id: number;
};

type RepositoryModel = {
  id: number;
};

const normalizeRepository = (from: RepositoryApi): RepositoryModel => {
  return {
    id: from.id,
  };
};

export { RepositoryApi, RepositoryModel, normalizeRepository };
