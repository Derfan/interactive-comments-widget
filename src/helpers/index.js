export const findElement = (entities, id) => {
  if (!entities?.length) return null;

  let comment = null;

  for (let i = 0; i < entities.length; i++) {
    const item = entities[i];

    if (item.id === id) return item;

    comment = findElement(item.replies, id);

    if (comment) return comment;
  }

  return comment;
};
