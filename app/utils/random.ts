export function getRandomText(texts: string[]) {
  const randomIndex = Math.floor(Math.random() * texts.length);
  return texts[randomIndex];
}
