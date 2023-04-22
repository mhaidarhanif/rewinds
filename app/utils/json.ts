export function jsonStringify(children: any | null | undefined) {
  return JSON.stringify(children, null, 2);
}

export function jsonParse(text: string | null | undefined) {
  return JSON.parse(String(text));
}
