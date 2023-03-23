import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import pluralize from "pluralize";

import { Debug, RemixLink } from "~/components";
import { model } from "~/models";
import { createSitemap } from "~/utils";

import type { LoaderArgs } from "@remix-run/node";

export const handle = createSitemap();

export async function loader({ request }: LoaderArgs) {
  const users = await model.adminUser.query.getAll();
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
                <h3>
                  {user.name} (@{user.username})
                </h3>
                <h4>{user.email}</h4>
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
