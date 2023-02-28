import ApiStore from "@store/ApiStore";
import { Baseurls } from "@utils/Baseurls";
import { ILocalStore } from "@utils/ILocalStore";

abstract class GithubStore implements ILocalStore {
  private readonly _apiStorage = new ApiStore(Baseurls.GITHUB);

  destroy(): void {
    throw new Error("Method not implemented.");
  }
}

export default GithubStore;
