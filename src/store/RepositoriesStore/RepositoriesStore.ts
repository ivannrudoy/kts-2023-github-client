import GithubStore from "@store/GithubStore";
import {
  mapRepositoryApiModel,
  normalizeRepository,
  RepositoryApi,
  RepositoryModel,
} from "@store/models/Github";
import {
  CollecionModel,
  liniarizeCollection,
  normalizeCollection,
} from "@store/models/shared/collection";
import { buildEndpoint } from "@utils/urls";
import { action, computed, makeObservable } from "mobx";

class RepositoriesStore extends GithubStore<
  CollecionModel<number, RepositoryApi>,
  RepositoryApi[],
  RepositoryModel[]
> {
  protected _data: CollecionModel<number, RepositoryApi> = {
    order: [],
    entities: {},
  };

  constructor() {
    super();

    makeObservable<RepositoriesStore>(this, {
      count: computed,
    });
  }

  get data(): RepositoryModel[] {
    return mapRepositoryApiModel(liniarizeCollection(this._data));
  }

  get count(): number {
    return this._data.order.length;
  }

  setData(d: CollecionModel<number, RepositoryApi>): void {
    this._data = d;
  }

  async getRepositories(perPage: number, page: number) {
    this.getDataFromApiStore(
      buildEndpoint(`/orgs/${this.ORG}/repos`, { per_page: perPage, page })
    );
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
