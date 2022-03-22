export const normalizeData = (entities) => {
  const result = [];

  const walk = (entities, result, parentId = null) => {
    if (!entities?.length) return null;

    for (const { replies, ...item} of entities) {
      result.push({ parentId, ...item });

      walk(replies, result, item.id);
    }
  };

  walk(entities, result);

  return result;
};
