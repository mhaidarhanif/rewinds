import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz1234567890", 10);

export function createNanoID() {
  return nanoid();
}
