import { isPrefetch } from "remix-utils";

export function createCacheHeaders(request: Request) {
  const headers = new Headers();

  if (isPrefetch(request)) {
    headers.set("Cache-Control", "private, max-age=5, smax-age=0");
  } else {
    headers.set("Cache-Control", "private, max-age=10, smax-age=0");
  }

  return headers;
}
