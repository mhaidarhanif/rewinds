import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Debug, PageHeader, RemixLinkText } from "~/components";
import { authorizeUser } from "~/helpers";
import { createSitemap } from "~/utils";

import type { LoaderArgs } from "@remix-run/node";

export const handle = createSitemap();

export async function loader({ request }: LoaderArgs) {
  const { user } = await authorizeUser(request);

  return json({ user });
}

export default function UserSettingsRoute() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <div data-id="user-settings" className="space-y-4">
      <PageHeader size="xs" withBackground={false} withContainer={false}>
        <h1>User Settings</h1>
      </PageHeader>

      <section className="space-y-2">
        <h2>Change your profile, email, password, etc</h2>
        <h3>
          <span>Settings for </span>
          <RemixLinkText to={`/${user.username}`}>
            @{user.username}
          </RemixLinkText>
          <span> / {user.name}</span>
        </h3>
      </section>

      <Debug name="user">{user}</Debug>
    </div>
  );
}
