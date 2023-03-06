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
import { makeObservable } from "mobx";

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

    makeObservable<RepositoriesStore>(this, {});
  }

  get data(): RepositoryModel[] {
    return mapRepositoryApiModel(liniarizeCollection(this._data));
  }

  setData(d: CollecionModel<number, RepositoryApi>): void {
    if (this.data.length === 0) {
      this._data = d;
    } else {
      this._data.order = this._data.order.concat(d.order);
      this._data.entities = { ...this._data.entities, ...d.entities };
    }
  }

  async getRepositories(perPage: number, page: number) {
    if (this.data.length === 0 && page > 1) {
      for (let c = 2; c <= page; c++) {
        this.getDataFromApiStore(
          buildEndpoint(`/orgs/${this.ORG}/repos`, {
            per_page: perPage,
            page: c,
          })
        );
      }
    } else {
      this.getDataFromApiStore(
        buildEndpoint(`/orgs/${this.ORG}/repos`, { per_page: perPage, page })
      );
    }
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
