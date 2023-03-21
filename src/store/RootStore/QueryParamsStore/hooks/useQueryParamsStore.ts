import { useRootStore } from "@store/RootStore";

const useQueryParamsStore = () => {
  return useRootStore().query;
};

export { useQueryParamsStore };
