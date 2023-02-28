import { HTTPMethod } from "@utils/HTTPMethod";
import { ILocalStore } from "@utils/ILocalStore";
import axios from "axios";

export default class ApiStore implements ILocalStore {
  private _baseUrl: string;

  constructor(baseUrl: string) {
    this._baseUrl = baseUrl;
  }

  async request(method: HTTPMethod, endpoint: string): Promise<any> {
    return axios({
      method: method,
      url: `${this._baseUrl}${endpoint}`,
    });
  }

  destroy(): void {}
}
