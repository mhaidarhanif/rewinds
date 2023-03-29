import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import {
  Debug,
  PageHeader,
  RemixLinkText,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "~/components";
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

      <section>
        <UserSettingsTabs />
      </section>

      <Debug name="user">{user}</Debug>
    </div>
  );
}

export function UserSettingsTabs() {
  return (
    <Tabs defaultValue="user" className="w-full">
      <TabsList>
        <TabsTrigger value="user">User</TabsTrigger>
        <TabsTrigger value="user-profile">Profile</TabsTrigger>
        <TabsTrigger value="user-password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="user">
        <UserSettingsTabUser />
      </TabsContent>
      <TabsContent value="user-profile">
        <p className="dim">Update your profile headline and bio.</p>
      </TabsContent>
      <TabsContent value="user-password">
        <p className="dim">
          Change your password. After saving, you'll be logged out.
        </p>
      </TabsContent>
    </Tabs>
  );
}

function UserSettingsTabUser() {
  return (
    <div>
      <p className="dim">
        Make changes to your user account. Click save when you're done.
      </p>
    </div>
  );
}
