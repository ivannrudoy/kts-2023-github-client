import GithubStore from "@store/GithubStore";
import {
  normalizeRepository,
  RepositoryApi,
  RepositoryModel,
} from "@store/models/Github";
import {
  liniarizeCollection,
  normalizeCollection,
} from "@store/models/shared/collection";
import { computed, makeObservable } from "mobx";

const ORG = "ktsstudio";

class RepositoriesStore extends GithubStore<RepositoryApi[], RepositoryModel> {
  constructor() {
    super();
    makeObservable<RepositoriesStore>(this, {
      list: computed,
    });
  }

  get list(): RepositoryModel[] {
    return liniarizeCollection(this._data);
  }

  async getRepositories() {
    this.getDataFromApiStore(`/orgs/${ORG}/repos`);
  }

  normalizeApiData(d: RepositoryApi[]): void {
    this.setData(
      normalizeCollection(
        d.map((item) => normalizeRepository(item)),
        (el) => el.id
      )
    );
  }
}

export default RepositoriesStore;
