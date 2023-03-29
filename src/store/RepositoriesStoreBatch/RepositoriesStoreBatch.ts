import GithubStore from "@store/GithubStore";
import {
  mapRepositoryApiModel,
  RepositoryApi,
  RepositoryModel,
} from "@store/models/Github";
import {
  CollectionModel,
  liniarizeCollection,
  normalizeCollection,
} from "@store/models/shared/collection";
import { ResponseState } from "@utils/ResponseState";
import { buildEndpoint } from "@utils/urls";
import { action, computed, makeObservable, observable } from "mobx";

type PrivateFields = "_responseStateBatch";

class RepositoriesStoreBatch extends GithubStore<
  CollectionModel<number, RepositoryApi>,
  RepositoryApi[],
  RepositoryModel[]
> {
  protected _aux: CollectionModel<number, RepositoryApi> = {
    order: [],
    entities: {},
  };
  protected _data: CollectionModel<number, RepositoryApi> = {
    order: [],
    entities: {},
  };
  private _responseStateBatch: ResponseState = ResponseState.INITIAL;

  constructor() {
    super();

    makeObservable<RepositoriesStoreBatch, PrivateFields>(this, {
      _responseStateBatch: observable,
      setResponseStateBatch: action,
      resetData: action,
      responseStateBatch: computed,
      count: computed,
    });
  }

  get responseStateBatch(): ResponseState {
    return this._responseStateBatch;
  }

  setResponseStateBatch(state: ResponseState) {
    this._responseStateBatch = state;
  }

  get data(): RepositoryModel[] {
    return mapRepositoryApiModel(liniarizeCollection(this._data));
  }

  get count(): number {
    return this.data.length;
  }

  setData(d: CollectionModel<number, RepositoryApi>): void {
    this._data = d;
  }

  setAux(d: CollectionModel<number, RepositoryApi>): void {
    this._aux.order = this._aux.order.concat(d.order);
    this._aux.entities = { ...this._aux.entities, ...d.entities };
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
    this.setResponseStateBatch(ResponseState.BATCH_LOADING);
    for (let c = 1; c <= page; c++) {
      await this.getDataFromApiStore(
        buildEndpoint(`/orgs/${name}/repos`, {
          per_page: perPage,
          page: c,
          type,
        })
      );
    }
    this.setData(this._aux);
    this.setResponseStateBatch(ResponseState.BATCH_SUCCESS);
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

export default RepositoriesStoreBatch;
