export function truncate(text: string, maxLength = 42) {
  return text.length > maxLength
    ? text.substring(0, maxLength - 3) + "..."
    : text;
}
