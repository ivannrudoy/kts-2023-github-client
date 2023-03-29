type ReadmeApi = {
  content: string;
};

type ReadmeModel = {
  content: string;
};

const getInitialReadmeApi = (): ReadmeApi => ({
  content: "",
});

const normalizeReadme = (from: ReadmeApi): ReadmeModel => {
  return {
    content: from.content,
  };
};

export { ReadmeApi, ReadmeModel, getInitialReadmeApi, normalizeReadme };
