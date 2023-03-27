import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { model } from "~/models";
import { createSitemap } from "~/utils";

export const handle = createSitemap();

export async function loader() {
  const users = await model.user.query.getAllUsernames();
  return json({ users });
}

export default function Route() {
  const { users } = useLoaderData<typeof loader>();

  return (
    <ul>
      {users.map((user) => {
        return <li key={user.id}>{user.username}</li>;
      })}
    </ul>
  );
}
