import { Debug, Layout } from "~/components";
import { useRootLoaderData } from "~/hooks";

export default function PageComponentsDebugRoute() {
  const { user } = useRootLoaderData();

  return (
    <Layout>
      <Debug name="user">{user}</Debug>
    </Layout>
  );
}
