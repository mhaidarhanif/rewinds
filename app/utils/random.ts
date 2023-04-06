export function getRandomText(texts: string[]): string {
  const randomIndex = Math.floor(Math.random() * texts.length);
  return texts[randomIndex];
}
