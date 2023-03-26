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

export default function UserSettings() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <div data-id="user-settings" className="contain-sm space-y-4">
      <PageHeader size="xs" withBackground={false} withContainer={false}>
        <h1>Settings</h1>
      </PageHeader>

      <section className="space-y-2">
        <h2>
          <span>Settings for </span>
          <RemixLinkText prefetch="intent" to={`/${user.username}`}>
            @{user.username}
          </RemixLinkText>
        </h2>
        <h3>Change your profile, email, password, etc</h3>
      </section>

      <Debug name="user">{user}</Debug>
    </div>
  );
}
