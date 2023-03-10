import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Debug, Layout } from "~/components";
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

export default function DebugRoute() {
  const { initialNumber, numbers } = useLoaderData<typeof loader>();

  return (
    <Layout>
      <Debug name="numbers">{{ initialNumber, numbers }}</Debug>
    </Layout>
  );
}
