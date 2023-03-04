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
import { computed, makeObservable, observable } from "mobx";

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
    if (this.count === 0) {
      this._data = d;
    } else {
      this._data.order = this._data.order.concat(d.order);
      this._data.entities = { ...this._data.entities, ...d.entities };
    }
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
