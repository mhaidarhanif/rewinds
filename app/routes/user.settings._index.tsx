import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Debug, PageHeader, RemixLinkText } from "~/components";
import { userModel } from "~/models";
import { authenticator } from "~/services";
import { createSitemap, invariant } from "~/utils";

import type { LoaderArgs } from "@remix-run/node";

export const handle = createSitemap();

export async function loader({ request }: LoaderArgs) {
  const userSession = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  invariant(userSession);

  const user = await userModel.getUserForSession({ id: userSession.id });
  invariant(user, "User not found");

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
