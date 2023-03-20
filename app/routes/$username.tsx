import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { AnchorText, Balancer, Layout, PageHeader } from "~/components";
import { configMeta } from "~/configs";
import { userModel } from "~/models";
import { createMetaData, createSitemap, invariant } from "~/utils";

import type { LoaderArgs, V2_MetaFunction } from "@remix-run/node";

export const handle = createSitemap();

export const meta: V2_MetaFunction<typeof loader> = ({ params, data }) => {
  const { username } = params;
  const user = data.user;

  if (!user) {
    return createMetaData({
      title: "Profile does not exist",
      description: `Cannot find user with the username ${username}`,
    });
  }

  return createMetaData({
    title: `${user.name} (@${user.username})`,
    description: `${user.profile.bio || "User has no bio yet."}`,
  });
};

/**
 * Splat route can check for:
 * 1. User from database
 * 2. Organization from database
 * 3. If nothing found, tell this account doesn’t exist
 */
export async function loader({ params }: LoaderArgs) {
  const { username } = params;
  invariant(username, "userId doesn not exist");

  const user = await userModel.getUserByUsername({ username });
  if (!user) {
    return json({ user: null }, { status: 404 });
  }

  return json({ user });
}

export default function SplatUsernameRoute() {
  const { user } = useLoaderData<typeof loader>();

  if (user) {
    return (
      <Layout
        isSpaced
        layoutHeader={
          <PageHeader size="sm" isTextCentered>
            <h1>
              <Balancer>{user.name}</Balancer>
            </h1>
            <h2 className="text-xl lg:text-2xl">@{user.username}</h2>
          </PageHeader>
        }
      >
        <section className="contain">
          <p className="prose-config">{user.profile.bio}</p>
        </section>
      </Layout>
    );
  }

  return (
    <Layout
      isSpaced
      layoutHeader={
        <PageHeader size="sm">
          <h1>Oops, Error 404: Page Not Found</h1>
          <p>Sorry, this page is not available..</p>
        </PageHeader>
      }
    >
      <p>
        You might want to inform{" "}
        <AnchorText href={configMeta.author.url}>
          {configMeta.author.name}
        </AnchorText>
        .
      </p>
    </Layout>
  );
}
