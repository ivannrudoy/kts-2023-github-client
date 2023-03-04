import GithubStore from "@store/GithubStore";
import {
  getInitialReadmeApi,
  normalizeReadme,
  ReadmeApi,
  ReadmeModel,
} from "@store/models/Github";

/**
 * @TODO Add html content
 */
class READMEStore extends GithubStore<ReadmeApi, ReadmeApi, ReadmeModel> {
  protected _data: ReadmeApi = getInitialReadmeApi();

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
    this.getDataFromApiStore(`/repos/${this.ORG}/${name}/readme`);
  }
}

export default READMEStore;
