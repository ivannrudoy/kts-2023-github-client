import ApiStore from "@store/ApiStore";
import { Baseurls } from "@utils/Baseurls";
import { HTTPMethod } from "@utils/HTTPMethod";
import { ILocalStore } from "@utils/ILocalStore";
import { ResponseCode } from "@utils/ResponseCode";
import { ResponseState } from "@utils/ResponseState";
import axios, { AxiosError, AxiosPromise, AxiosResponse } from "axios";
import { action, computed, makeObservable, observable } from "mobx";

type PrivateFields = "_data" | "_responseState";

/**
 * @TODO Add headers schema
 */
abstract class GithubStore<D, I, O> implements ILocalStore {
  private readonly _apiStorage = new ApiStore(Baseurls.GITHUB);
  protected _data: D | undefined;
  protected _responseState: ResponseState = ResponseState.INITIAL;
  ORG = "ktsstudio";

  constructor() {
    makeObservable<GithubStore<D, I, O>, PrivateFields>(this, {
      _data: observable.ref,
      _responseState: observable,
      data: computed,
      responseState: computed,
      setResponseState: action,
      setData: action,
    });
  }

  abstract get data(): O;

  abstract setData(d: D): void;

  get responseState(): ResponseState {
    return this._responseState;
  }

  setResponseState(state: ResponseState) {
    this._responseState = state;
  }

  protected async getDataFromApiStore(endpoint: string, headers: any = {}) {
    this.setResponseState(ResponseState.INITIAL);
    headers["Authorization"] = `Bearer ${process.env.TOKEN}`;

    try {
      let response: AxiosPromise<I> = await this._apiStorage.request(
        HTTPMethod.GET,
        endpoint,
        headers
      );

      if ((await response).status === ResponseCode.OK) {
        try {
          const data = (await response).data;
          try {
            this.normalizeApiData(data);
            this.setResponseState(ResponseState.SUCCESS);
            return;
          } catch (e) {
            this.setResponseState(ResponseState.ERROR);
          }
        } catch (err) {
        }
      }
      response.catch((error) => {
        this.setResponseState(ResponseState.ERROR);
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const e = error as AxiosError;
        const response = e.response as AxiosResponse ?? {};
        const status = response.status;
        if (status === ResponseCode.ERR_NOT_FOUND) {
          this.setResponseState(ResponseState.ERROR_NOT_FOUND);
        }
        // @TODO Handle uknown error      
      }
    }
  }

  abstract normalizeApiData(d: I): void;

  destroy(): void {}
}

export default GithubStore;
