import { Debug, Layout } from "~/components";
import { useRootLoaderData } from "~/hooks";
import { createSitemap } from "~/utils";

export const handle = createSitemap();

export default function Route() {
  const { user } = useRootLoaderData();

  return (
    <Layout>
      <Debug name="user">{user}</Debug>
    </Layout>
  );
}
