import GithubStore from "@store/GithubStore";
import {
  normalizeRepository,
  RepositoryApi,
  RepositoryModel,
} from "@store/models/Github";
import {
  CollecionModel,
  liniarizeCollection,
  normalizeCollection,
} from "@store/models/shared/collection";
import { computed, makeObservable } from "mobx";

const ORG = "ktsstudio";

class RepositoriesStore extends GithubStore<
  CollecionModel<number, RepositoryApi>,
  RepositoryApi[],
  RepositoryModel
> {
  protected _data: CollecionModel<number, RepositoryApi> = {
    order: [],
    entities: {},
  };

  get data(): RepositoryApi[] {
    return liniarizeCollection(this._data);
  }

  setData(d: CollecionModel<number, RepositoryApi>): void {
    this._data = d;
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
