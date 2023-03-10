import pluralize from "pluralize";

export const formatPluralItems = (word: string, count: number) => {
  return pluralize(word, count, true);
};

export { pluralize };
