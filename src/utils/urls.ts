const buildEndpoint = (middleUrl: string, queryParams?: {}): string => {
  let e = `${middleUrl}`;
  if (queryParams) {
    e += "?";
    for (const [k, v] of Object.entries(queryParams)) {
      e += `${k}=${v}&`;
    }
    e = e.slice(0, -1);
  }
  return e;
};

export { buildEndpoint };
