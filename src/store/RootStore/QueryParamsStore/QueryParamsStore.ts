import { action, computed, makeObservable, observable } from "mobx";
import QueryString, { ParsedQs } from "qs";

type PrivateFields = "_params";

class QueryParamsStore {
  private _params: ParsedQs = {};
  private _search: string = "";

  constructor() {
    makeObservable<QueryParamsStore, PrivateFields>(this, {
      _params: observable.ref,
      params: computed,
      setSearch: action,
      page: computed,
      name: computed,
    });
  }

  get params() {
    return this._params;
  }

  changeSearchParam(
    searchParams: URLSearchParams,
    name: string,
    value: string
  ): URLSearchParams {
    searchParams.delete(name);
    searchParams.append(name, value);
    return searchParams;
  }

  get name(): string {
    const a = this.params["name"];
    const n = a ?? "";
    return `${n}`;
  }

  get page(): number {
    const a = this.params["page"];
    const p = parseInt(`${a}` ?? 1);
    return isNaN(p) ? -1 : p;
  }

  get type(): string {
    const a = this.params["type"];
    const n = a ?? "";
    return `${n}`;
  }

  setSearch(search: string) {
    search = search.startsWith("?") ? search.slice(1) : search;
    if (this._search !== search) {
      this._search = search;
      this._params = QueryString.parse(search);
    }
  }
}

export default QueryParamsStore;
