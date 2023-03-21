import { json } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";

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
  invariant(username, "userId does not exist");

  const user = await userModel.getUserByUsername({ username });
  if (!user) {
    return json({ user: null }, { status: 404 });
  }

  return json({ user });
}

export default function SplatUsernameRoute() {
  const { user } = useLoaderData<typeof loader>();
  const params = useParams();

  if (user) {
    return (
      <Layout
        isSpaced
        layoutHeader={
          <header>
            <div className="contain-full">
              <img
                className="h-40 rounded-b-lg sm:h-60 md:h-80"
                alt="User Cover"
                src={`https://images.unsplash.com/photo-1571745544682-143ea663cf2c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80`}
                height={300}
                width={1440}
              />
            </div>
          </header>
        }
      >
        <section className="mx-auto w-full max-w-lg">
          <div className="my-4 text-center">
            <h1>
              <Balancer>{user.name}</Balancer>
            </h1>
            <h2 className="text-xl lg:text-2xl">@{user.username}</h2>
          </div>

          <p className="prose-config card">{user.profile.bio}</p>
        </section>
      </Layout>
    );
  }

  return (
    <Layout
      isSpaced
      layoutHeader={
        <PageHeader size="sm">
          <h1>
            <Balancer>Oops, Error 404: Page Not Found</Balancer>
          </h1>
          <h2>
            Sorry, this page <b>/{params.username}</b> is not available.
          </h2>
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
