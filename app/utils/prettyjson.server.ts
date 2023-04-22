import prettyjson from "prettyjson";

export function logPrettyJSON(data: any) {
  console.info(prettyjson.render(data));
}

export { prettyjson };
