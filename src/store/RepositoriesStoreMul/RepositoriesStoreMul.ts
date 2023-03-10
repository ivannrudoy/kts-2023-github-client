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
import { ResponseState } from "@utils/ResponseState";
import { buildEndpoint } from "@utils/urls";
import { action, computed, makeObservable } from "mobx";

class RepositoriesStore extends GithubStore<
  CollecionModel<number, RepositoryApi>,
  RepositoryApi[],
  RepositoryModel[]
> {
  protected _aux: CollecionModel<number, RepositoryApi> = {
    order: [],
    entities: {},
  };
  protected _data: CollecionModel<number, RepositoryApi> = {
    order: [],
    entities: {},
  };

  constructor() {
    super();

    makeObservable<RepositoriesStore>(this, {
      resetData: action,
      count: computed
    });
  }

  get data(): RepositoryModel[] {
    return mapRepositoryApiModel(liniarizeCollection(this._data));
  }

  get count(): number {
    return this.data.length;
  }

  setData(d: CollecionModel<number, RepositoryApi>): void {
    this._data = d;
  }

  setAux(d: CollecionModel<number, RepositoryApi>): void {
    this._aux.order = this._data.order.concat(d.order);
    this._aux.entities = { ...this._data.entities, ...d.entities };
  }

  resetData() {
    this._data = {
      order: [],
      entities: {},
    };
  }

  async getRepositories(
    perPage: number,
    page: number,
    name: string,
    type: string
  ) {
    for (let c = 2; c <= page; c++) {
      await this.getDataFromApiStore(
        buildEndpoint(`/orgs/${name}/repos`, {
          per_page: perPage,
          page: c,
          type,
        })
      );
    }
    this.setData(this._aux);
    console.log(JSON.stringify(this._data));
    this.setResponseState(ResponseState.FULL_LOAD);
  }

  normalizeApiData(d: RepositoryApi[]): void {
    this.setAux(
      normalizeCollection(
        d.map((item) => item),
        (el) => el.id
      )
    );
  }
}

export default RepositoriesStore;
