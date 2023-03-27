import { isPrefetch } from "remix-utils";

export function createCacheHeaders(request: Request, maxAge?: number) {
  const headers = new Headers();
  const maxAgePrefetch = maxAge || 5;
  const maxAgeNoPrefetch = maxAgePrefetch * 2;

  if (isPrefetch(request)) {
    headers.set(
      "Cache-Control",
      `private, max-age=${maxAgePrefetch}, smax-age=0`
    );
  } else {
    headers.set(
      "Cache-Control",
      `private, max-age=${maxAgeNoPrefetch}, smax-age=0`
    );
  }

  return headers;
}
