import GithubStore from "@store/GithubStore";
import { RepositoryApi, RepositoryModel } from "@store/models/Github";
import { action, computed, makeObservable, observable } from "mobx";

type PrivateFields = "_list";

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

  normalizeApiData(d: RepositoryApi[]): void {
    throw new Error("Method not implemented.");
  }
}

export default RepositoriesStore;
