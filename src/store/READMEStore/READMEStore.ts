import GithubStore from "@store/GithubStore";

class READMEStore extends GithubStore<string, string, string> {
  protected _data: string = "";

  get data(): string {
    return this._data;
  }

  setData(d: string): void {
    this._data = d;
  }

  normalizeApiData(d: string): void {
    this.setData(d);
  }

  async getReadme(name: string) {
    this.getDataFromApiStore(`/repos/${this.ORG}/${name}/readme`);
  }
}

export default READMEStore;
