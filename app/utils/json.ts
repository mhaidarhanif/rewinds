export function jsonStringify(children: object | undefined) {
  return JSON.stringify(children, null, 2);
}

export function jsonParse(text: string | undefined) {
  if (!text) return {};
  return JSON.parse(text);
}
