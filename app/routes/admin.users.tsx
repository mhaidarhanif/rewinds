import { json } from "@remix-run/node";

import { createSitemap } from "~/utils";

import type { LoaderArgs } from "@remix-run/node";

export const handle = createSitemap();

export async function loader({ request }: LoaderArgs) {
  return json({});
}

export default function AdminUsersRoute() {
  return (
    <div data-id="admin-users">
      <h2>Users</h2>
      <p>Users content</p>
    </div>
  );
}
