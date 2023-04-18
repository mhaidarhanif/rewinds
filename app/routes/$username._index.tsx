import { json } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import { notFound } from "remix-utils";

import {
  AnchorText,
  AvatarAuto,
  Balancer,
  ButtonLink,
  Layout,
  PageHeader,
  RemixLink,
} from "~/components";
import { configMeta } from "~/configs";
import { model } from "~/models";
import {
  cn,
  createCacheHeaders,
  createMetaData,
  createSitemap,
  formatDateTime,
  formatRelativeTime,
  invariant,
  truncateText,
} from "~/utils";

import type { LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { useRootLoaderData } from "~/hooks";

export const handle = createSitemap();

export const meta: V2_MetaFunction<typeof loader> = ({ params, data }) => {
  const user = data?.user;

  if (!user) {
    return createMetaData({
      title: "Profile not found",
      description: `Cannot find user with the username ${params.username}`,
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
export async function loader({ request, params }: LoaderArgs) {
  invariant(params.username, "username not found");

  // This is not using requireUserSession because anyone public can get the data
  const user = await model.user.query.getByUsername({
    username: params.username,
  });
  if (!user) {
    return notFound({ user: null });
  }

  return json({ user }, { headers: createCacheHeaders(request) });
}

export default function Route() {
  const { user: userSession } = useRootLoaderData();
  const { user } = useLoaderData<typeof loader>();
  const params = useParams();

  const isOwner = userSession?.id === user?.id;

  if (user) {
    return (
      <Layout
        isSpaced
        layoutHeader={
          <header>
            <div className="contain-full">
              <img
                className={cn(
                  "h-48 sm:h-60 md:h-72",
                  "rounded-b-lg object-cover"
                )}
                alt="User Cover"
                src={`https://images.unsplash.com/photo-1571745544682-143ea663cf2c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80`}
                height={240}
                width={1440}
              />
            </div>
          </header>
        }
      >
        <div className="contain-sm space-y-8">
          <section className="my-4 space-y-2">
            <div
              className={cn(
                "-mt-12 sm:-mt-16",
                "flex flex-wrap items-end justify-between"
              )}
            >
              <AvatarAuto
                user={user}
                className={cn(
                  "size-4xl sm:size-5xl",
                  "outline outline-4 outline-surface-50 dark:outline-surface-900"
                )}
              />
              {isOwner && (
                <ButtonLink to="/user/settings" variant="outline" size="sm">
                  Edit profile
                </ButtonLink>
              )}
            </div>

            <div>
              <h1>{user.name}</h1>
              <h2>@{user.username}</h2>
            </div>
          </section>

          <section className="space-y-2">
            <h3>{user.profile.headline}</h3>
            <p className="prose-config">{user.profile.bio}</p>
          </section>

          <section className="space-y-2">
            <h3>Notes</h3>
            <ul className="space-y-2">
              {user.notes.length <= 0 && <p>No notes yet.</p>}
              {user.notes.map((note) => {
                return (
                  <li key={note.id}>
                    <RemixLink
                      to={note.slug}
                      className="card hover:card-hover block"
                    >
                      <h4>{note.title}</h4>
                      <p>{truncateText(note.content)}</p>
                      <p className="dim queue-sm">
                        <span>{formatDateTime(note.updatedAt)}</span>
                        <span>•</span>
                        <span>{formatRelativeTime(note.updatedAt)}</span>
                      </p>
                    </RemixLink>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
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
