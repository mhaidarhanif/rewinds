import voca from "voca";

export function createSlug(text: string) {
  return voca.slugify(text);
}
