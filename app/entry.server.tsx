import { RemixServer } from "@remix-run/react";
import { renderToString } from "react-dom/server";

import { seoRouteHandlers } from "./seo-routes.server";

import type { EntryContext } from "@remix-run/node";

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  for (const handler of seoRouteHandlers) {
    const seoRouteResponse = await handler(request, remixContext);
    if (seoRouteResponse) return seoRouteResponse;
  }

  const markup = renderToString(
    <RemixServer context={remixContext} url={request.url} />
  );

  responseHeaders.set("Content-Type", "text/html");

  return new Response("<!DOCTYPE html>" + markup, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
