import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { AnchorText, Balancer, Layout, PageHeader } from "~/components";
import { configMeta } from "~/configs";
import { userModel } from "~/models";
import { createMetaData, createSitemap, invariant } from "~/utils";

import type { LoaderArgs } from "@remix-run/node";

export const handle = createSitemap();

export const meta = createMetaData({
  title: "Page Not Found",
  description: "There is nothing here.",
});

/**
 * Splat route can check for:
 * 1. User from database
 * 2. Organization from database
 * 3. If nothing found, return 404 page
 */
export async function loader({ params }: LoaderArgs) {
  const { username } = params;
  invariant(username, "userId doesn't exist");

  const user = await userModel.getUserByUsername({ username });
  if (!user) {
    return json({ user: null }, { status: 404 });
  }

  return json({ user });
}

export default function SplatRoute() {
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
          <h2>Oops, Error 404: Page Not Found</h2>
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
