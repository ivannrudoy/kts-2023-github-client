export type CollecionModel<K extends string | number, T> = {
  order: K[];
  entities: Record<K, T>;
};

export const getInitialCollectionModel = (): CollecionModel<any, any> => ({
  order: [],
  entities: {},
});

export const normalizeCollection = <K extends string | number, T>(
  elements: T[],
  getKeyForElement: (element: T) => K
): CollecionModel<K, T> => {
  const collection: CollecionModel<K, T> = getInitialCollectionModel();
  elements.forEach((el) => {
    const id = getKeyForElement(el);
    collection.order.push(id);
    collection.entities[id] = el;
  });
  return collection;
};

export const liniarizeCollection = <K extends string | number, T>(
  elements: CollecionModel<K, T>
): T[] => elements.order.map((el) => elements.entities[el]);

export const concatCollections = <K extends string | number, T>(
  coll1: CollecionModel<K, T>,
  coll2: CollecionModel<K, T>
): CollecionModel<K, T> => {
  return {
    order: coll1.order.concat(coll2.order),
    entities: { ...coll1.entities, ...coll2.entities },
  };
};
