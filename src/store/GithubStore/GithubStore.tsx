import { ILocalStore } from "@utils/ILocalStore";

abstract class GithubStore implements ILocalStore {
  destroy(): void {
    throw new Error("Method not implemented.");
  }
}

export default GithubStore;
