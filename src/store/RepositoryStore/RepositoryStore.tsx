import GithubStore from "@store/GithubStore";
import {
  normalizeRepository,
  RepositoryApi,
  RepositoryModel,
} from "@store/models/Github";

class RepositoryStore extends GithubStore<
  RepositoryApi,
  RepositoryApi,
  RepositoryModel
> {
  get data(): RepositoryApi {
    throw new Error("Method not implemented.");
  }

  setData(d: RepositoryApi): void {
    throw new Error("Method not implemented.");
  }

  normalizeApiData(d: RepositoryApi): void {
    this.setData(normalizeRepository(d));
  }
}

export default RepositoryStore;
