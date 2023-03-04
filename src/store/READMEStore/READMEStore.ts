import GithubStore from "@store/GithubStore";
import {
  getInitialReadmeApi,
  normalizeReadme,
  ReadmeApi,
  ReadmeModel,
} from "@store/models/Github";

class READMEStore extends GithubStore<ReadmeApi, ReadmeApi, ReadmeModel> {
  protected _data: ReadmeApi = getInitialReadmeApi();
  protected _headers = {
    Accept: "application/vnd.github.v3.html",
  };

  get data(): ReadmeModel {
    return normalizeReadme(this._data);
  }

  setData(d: ReadmeApi): void {
    this._data = d;
  }

  normalizeApiData(d: ReadmeApi): void {
    this.setData(d);
  }

  async getReadme(name: string) {
    this.getDataFromApiStore(
      `/repos/${this.ORG}/${name}/readme`,
      this._headers
    );
  }
}

export default READMEStore;
