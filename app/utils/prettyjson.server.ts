import prettyjson from "prettyjson";

export function log(data: any) {
  console.info(prettyjson.render(data));
}

export { prettyjson };
