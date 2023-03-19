import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import pluralize from "pluralize";

import { Debug, RemixLink } from "~/components";
import { adminUser } from "~/models";
import { createSitemap } from "~/utils";

import type { LoaderArgs } from "@remix-run/node";

export const handle = createSitemap();

export async function loader({ request }: LoaderArgs) {
  const users = await adminUser.getAllUsers();
  return json({ users });
}

export default function AdminUsersRoute() {
  const { users } = useLoaderData<typeof loader>();

  if (users.length <= 0) {
    return <span>No users. Please register new.</span>;
  }

  return (
    <div className="stack-v">
      <header>
        <span>All Users</span>
      </header>

      <ul className="space-y-2">
        {users.map((user) => {
          const userNotesCount = user.notes?.length;
          return (
            <RemixLink key={user.id} to={user.id} className="block">
              <li className="card hover:card-hover">
                <h3>{user.name}</h3>
                <h6>@{user.username}</h6>
                <p>
                  {userNotesCount} {pluralize("note", userNotesCount)}
                </p>
              </li>
            </RemixLink>
          );
        })}
      </ul>

      <Debug name="users">{users}</Debug>
    </div>
  );
}
