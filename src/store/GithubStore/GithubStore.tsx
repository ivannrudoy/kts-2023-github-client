import ApiStore from "@store/ApiStore";
import {
  CollecionModel,
  liniarizeCollection,
} from "@store/models/shared/collection";
import { Baseurls } from "@utils/Baseurls";
import { HTTPMethod } from "@utils/HTTPMethod";
import { ILocalStore } from "@utils/ILocalStore";
import { ResponseCode } from "@utils/ResponseCode";
import { ResponseState } from "@utils/ResponseState";
import { AxiosPromise } from "axios";
import { action, computed, makeObservable, observable } from "mobx";

type PrivateFields = "_data" | "_responseState";

abstract class GithubStore<I, O> implements ILocalStore {
  private readonly _apiStorage = new ApiStore(Baseurls.GITHUB);
  protected _data: CollecionModel<number, O> = {
    order: [],
    entities: {},
  };
  protected _responseState: ResponseState = ResponseState.INITIAL;

  constructor() {
    makeObservable<GithubStore<I, O>, PrivateFields>(this, {
      _data: observable.ref,
      _responseState: observable,
      data: computed,
      responseState: computed,
      setData: action,
    });
  }

  get data() {
    return liniarizeCollection(this._data);
  }

  setData(d: CollecionModel<number, O>) {
    this._data = d;
  }

  get responseState(): ResponseState {
    return this._responseState;
  }

  setResponseState(state: ResponseState) {
    this._responseState = state;
  }

  protected async getDataFromApiStore(endpoint: string) {
    this.setResponseState(ResponseState.INITIAL);

    let response: AxiosPromise<I> = await this._apiStorage.request(
      HTTPMethod.GET,
      endpoint
    );

    if ((await response).status === ResponseCode.OK) {
      const data = (await response).data;
      try {
        this.normalizeApiData(data);
        this.setResponseState(ResponseState.SUCCESS);
        return;
      } catch (e) {
        this.setResponseState(ResponseState.ERROR);
      }
    }
    response.catch((error) => {
      this.setResponseState(ResponseState.ERROR);
    });
  }

  abstract normalizeApiData(d: I): void;

  destroy(): void {}
}

export default GithubStore;
