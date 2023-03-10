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
import { action, makeObservable } from "mobx";

class RepositoriesStore extends GithubStore<
  CollecionModel<number, RepositoryApi>,
  RepositoryApi[],
  RepositoryModel[]
> {
  protected _data: CollecionModel<number, RepositoryApi> = {
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

  setData(d: CollecionModel<number, RepositoryApi>): void {
    console.log(JSON.stringify(d));
    // if (this.data.length === 0) {
    this._data = d;
    // } else {
    //   this._data.order = this._data.order.concat(d.order);
    //   this._data.entities = { ...this._data.entities, ...d.entities };
    // }
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
      //   if (this.data.length === 0 && page > 1) {
      //     for (let c = 2; c <= page; c++) {
      //       this.getDataFromApiStore(
      //         buildEndpoint(`/orgs/${name}/repos`, {
      //           per_page: perPage,
      //           page: c,
      //           type,
      //         })
      //       );
      //     }
      //   } else {
      this.getDataFromApiStore(
        buildEndpoint(`/orgs/${name}/repos`, {
          per_page: perPage,
          page,
          type,
        })
      );
      //   }
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
