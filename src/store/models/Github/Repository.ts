type RepositoryApi = {
  id: number;
  name: string;
  stargazers_count: number;
  updated_at: string;
  topics: string[];
  watchers_count: number;
  owner: {
    html_url: string;
    avatar_url: string;
    login: string;
  };
};

type RepositoryModel = {
  id: number;
  name: string;
  stargazers_count: number;
  updated_at: string;
  avatar_url: string;
  login: string;
  org_url: string;
  topics: string[];
  watchers: number;
};

const getInitialRepositoryApi = (): RepositoryApi => ({
  id: -1,
  name: "",
  stargazers_count: -1,
  updated_at: "",
  topics: [],
  watchers_count: 0,
  owner: {
    html_url: "",
    avatar_url: "",
    login: "",
  },
});

const normalizeRepository = (from: RepositoryApi): RepositoryModel => {
  return {
    id: from.id,
    name: from.name,
    stargazers_count: from.stargazers_count,
    updated_at: from.updated_at,
    avatar_url: from.owner.avatar_url,
    topics: from.topics,
    login: from.owner.login,
    org_url: from.owner.html_url,
    watchers: from.watchers_count,
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
