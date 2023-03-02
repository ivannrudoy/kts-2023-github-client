import GithubStore from "@store/GithubStore";
import {
  normalizeRepository,
  RepositoryApi,
  RepositoryModel,
} from "@store/models/Github";
import { normalizeCollection } from "@store/models/shared/collection";
import { action, computed, makeObservable, observable } from "mobx";

type PrivateFields = "_list";
const ORG = "ktsstudio";

class RepositoriesStore extends GithubStore<RepositoryApi[], RepositoryModel> {
  private _list: RepositoryModel[] = [];

  constructor() {
    super();
    makeObservable<RepositoriesStore, PrivateFields>(this, {
      _list: observable.ref,
      list: computed,
      setList: action,
    });
  }

  get list(): RepositoryModel[] {
    return this._list;
  }

  setList(val: RepositoryModel[]) {
    this._list = val;
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
