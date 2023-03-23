import GithubStore from "@store/GithubStore";
import {
  getInitialRepositoryApi,
  normalizeRepository,
  RepositoryApi,
  RepositoryModel,
} from "@store/models/Github";

class RepositoryStore extends GithubStore<
  RepositoryApi,
  RepositoryApi,
  RepositoryModel
> {
  protected _data: RepositoryApi = getInitialRepositoryApi();

  get data(): RepositoryModel {
    return normalizeRepository(this._data);
  }

  setData(d: RepositoryApi): void {
    this._data = d;
  }

  normalizeApiData(d: RepositoryApi): void {
    this.setData(d);
  }

  async getRepository(org: string, name: string) {
    this.getDataFromApiStore(`/repos/${org}/${name}`);
  }
}

export default RepositoryStore;
