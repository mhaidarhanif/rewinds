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
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="user">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Make changes to your user account. Click save when you're done.
        </p>
      </TabsContent>
      <TabsContent value="profile">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Update your profile headline and bio.
        </p>
      </TabsContent>
      <TabsContent value="password">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Change your password. After saving, you'll be logged out.
        </p>
      </TabsContent>
    </Tabs>
  );
}
