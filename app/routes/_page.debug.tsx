import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Debug, Layout } from "~/components";
import { useRootLoaderData } from "~/hooks";
import { createSitemap } from "~/utils";

export const handle = createSitemap();

export async function loader() {
  const INITIAL_NUMBER = 10 * 1;
  const numbers = Array.from(Array(INITIAL_NUMBER).keys());

  return json({
    initialNumber: INITIAL_NUMBER,
    numbers,
  });
}

export default function Route() {
  const loaderData = useLoaderData<typeof loader>();
  const rootLoaderData = useRootLoaderData();

  return (
    <Layout isSpaced>
      <Debug name="loaderData">{loaderData}</Debug>
      <Debug name="rootLoaderData">{rootLoaderData}</Debug>
    </Layout>
  );
}
