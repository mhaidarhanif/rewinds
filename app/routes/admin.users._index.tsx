import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import pluralize from "pluralize";

import { AvatarAuto, Badge, Debug, RemixLink } from "~/components";
import { model } from "~/models";
import {
  createSitemap,
  formatDateTimeTimezone,
  formatPluralItems,
  formatRelativeTime,
} from "~/utils";

import type { LoaderArgs } from "@remix-run/node";

export const handle = createSitemap();

export async function loader({ request }: LoaderArgs) {
  const users = await model.adminUser.query.getAll();
  const usersCount = users.length;
  return json({ users, usersCount });
}

export default function Route() {
  const { users, usersCount } = useLoaderData<typeof loader>();

  if (users.length <= 0) {
    return <span>No users. Please register new.</span>;
  }

  return (
    <div className="stack">
      <header>
        <span>{formatPluralItems("user", usersCount)}</span>
      </header>

      <ul className="space-y-2">
        {users.map((user) => {
          const userNotesCount = user.notes?.length;
          const userImagesCount = user.images?.length;

          return (
            <li key={user.id}>
              <RemixLink
                prefetch="intent"
                to={user.id}
                className="card hover:card-hover queue-center"
              >
                <AvatarAuto user={user} className="size-2xl" />
                <div>
                  <h5 className="queue-center">
                    <span>{user.name}</span>
                    <span>(@{user.username})</span>
                    <span>{user.email}</span>
                    <Badge>{user.role.name}</Badge>
                  </h5>
                  <p>
                    <span>Registered </span>
                    <b>{formatDateTimeTimezone(user.createdAt)} </b>
                    <b>({formatRelativeTime(user.createdAt)})</b>
                  </p>
                  <p className="queue-center">
                    <span>
                      {userNotesCount} {pluralize("note", userNotesCount)}
                    </span>
                    <span>
                      {userImagesCount} {pluralize("image", userImagesCount)}
                    </span>
                  </p>
                </div>
              </RemixLink>
            </li>
          );
        })}
      </ul>

      <Debug name="users">{users}</Debug>
    </div>
  );
}
