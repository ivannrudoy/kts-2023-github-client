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
import { buildEndpoint } from "@utils/urls";
import { action, makeObservable } from "mobx";

class RepositoriesStore extends GithubStore<
  CollectionModel<number, RepositoryApi>,
  RepositoryApi[],
  RepositoryModel[]
> {
  protected _data: CollectionModel<number, RepositoryApi> = {
    order: [],
    entities: {},
  };
  private prevName = "";

  constructor() {
    super();

    makeObservable<RepositoriesStore>(this, {
      resetData: action,
    });
  }

  get data(): RepositoryModel[] {
    return mapRepositoryApiModel(liniarizeCollection(this._data));
  }

  setData(d: CollectionModel<number, RepositoryApi>): void {
    this._data = d;
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
    if (page !== -1 && name !== "") {
      this.getDataFromApiStore(
        buildEndpoint(`/orgs/${name}/repos`, {
          per_page: perPage,
          page,
          type,
        })
      );
    }
  }

  normalizeApiData(d: RepositoryApi[]): void {
    this.setData(
      normalizeCollection(
        d.map((item) => item),
        (el) => el.id
      )
    );
  }
}

export default RepositoriesStore;
