import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Debug, PageHeader, RemixLinkText } from "~/components";
import { requireUserSession } from "~/helpers";
import { createSitemap } from "~/utils";

import type { LoaderArgs } from "@remix-run/node";

export const handle = createSitemap();

export async function loader({ request }: LoaderArgs) {
  const { user } = await requireUserSession(request);

  return json({ user });
}

export default function Route() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <div className="contain-sm space-y-4">
      <PageHeader size="xs" withBackground={false} withContainer={false}>
        <h1 className="text-3xl">Settings</h1>
        <p>
          <span>Settings for </span>
          <RemixLinkText prefetch="intent" to={`/${user.username}`}>
            @{user.username}
          </RemixLinkText>
        </p>
        <p>Change your profile, email, password, etc</p>
      </PageHeader>

      <Debug name="user">{user}</Debug>
    </div>
  );
}
