import { action, computed, makeObservable, observable } from "mobx";
import QueryString, { ParsedQs } from "qs";

type PrivateFields = "_params";

class QueryParamsStore {
  private _params: ParsedQs = {};
  private _search: string = "";

  constructor() {
    makeObservable<QueryParamsStore, PrivateFields>(this, {
      _params: observable.ref,
      // stringifiedParam: computed,
      page: computed,
      params: computed,
      setSearch: action,
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
    return new URLSearchParams({
      [`${name}`]: value,
    });
  }

  get page(): number {
    const a = this.params["page"];
    const p = parseInt(`${a}` ?? 1);
    return isNaN(p) ? 1 : p;
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
