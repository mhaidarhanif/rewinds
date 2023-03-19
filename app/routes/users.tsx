import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { userModel } from "~/models";

import type { SEOHandle } from "@balavishnuvj/remix-seo";

export const handle: SEOHandle = {
  getSitemapEntries: async () => {
    const users = await userModel.getAllUserUsernames();
    const userEntries: any = users.map((user) => {
      return { route: `/${user.username}`, priority: 0.8 };
    });
    return [{ route: `/users`, priority: 0.7 }, ...userEntries];
  },
};

export async function loader() {
  const users = await userModel.getAllUserUsernames();
  return json({ users });
}

export default function UsersRoute() {
  const { users } = useLoaderData<typeof loader>();

  return (
    <ul>
      {users.map((user) => {
        return <li key={user.id}>{user.username}</li>;
      })}
    </ul>
  );
}
