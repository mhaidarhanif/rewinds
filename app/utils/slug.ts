import voca from "voca";

/**
 * Voca is a JavaScript library for manipulating strings
 * So it's not just to slugify text
 */

export function createSlug(text: string) {
  return voca.slugify(text);
}
