import usersUnallowedJSON from "./users-unallowed.json";

function checkDuplicates(arr: string[]) {
  const counts = arr.reduce((obj, item) => {
    obj[item] = (obj[item] ?? 0) + 1;
    return obj;
  }, {} as Record<string, number>);

  return Object.keys(counts)
    .filter((item) => counts[item] > 1)
    .map((item) => item);
}

const duplicates = checkDuplicates(usersUnallowedJSON);

console.info("Duplicates:", duplicates);
