export type CollectionModel<K extends string | number, T> = {
  order: K[];
  entities: Record<K, T>;
};

export const getInitialCollectionModel = (): CollectionModel<any, any> => ({
  order: [],
  entities: {},
});

export const normalizeCollection = <K extends string | number, T>(
  elements: T[],
  getKeyForElement: (element: T) => K
): CollectionModel<K, T> => {
  const collection: CollectionModel<K, T> = getInitialCollectionModel();
  elements.forEach((el) => {
    const id = getKeyForElement(el);
    collection.order.push(id);
    collection.entities[id] = el;
  });
  return collection;
};

export const liniarizeCollection = <K extends string | number, T>(
  elements: CollectionModel<K, T>
): T[] => elements.order.map((el) => elements.entities[el]);

export const concatCollections = <K extends string | number, T>(
  coll1: CollectionModel<K, T>,
  coll2: CollectionModel<K, T>
): CollectionModel<K, T> => {
  return {
    order: coll1.order.concat(coll2.order),
    entities: { ...coll1.entities, ...coll2.entities },
  };
};
