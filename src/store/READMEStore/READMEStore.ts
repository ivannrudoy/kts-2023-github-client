import GithubStore from "@store/GithubStore";
import { normalizeReadme, ReadmeApi, ReadmeModel } from "@store/models/Github";

class READMEStore extends GithubStore<string, string, string> {
  // protected _data: ReadmeApi = getInitialReadmeApi();
  protected _data: string = "";

  protected _headers = {
    Accept: "application/vnd.github.v3.html",
  };

  get data(): string {
    return this._data;
  }

  setData(d: string): void {
    this._data = d;
  }

  normalizeApiData(d: string): void {
    this.setData(d);
  }

  async getReadme(org: string, name: string) {
    this.getDataFromApiStore(`/repos/${org}/${name}/readme`, this._headers);
  }
}

export default READMEStore;
