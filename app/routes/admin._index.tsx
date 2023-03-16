import { json } from "@remix-run/node";

import { createSitemap } from "~/utils";

import type { LoaderArgs } from "@remix-run/node";

export const handle = createSitemap();

export async function loader({ request }: LoaderArgs) {
  return json({});
}

export default function AdminIndexRoute() {
  return (
    <div data-id="admin-index">
      <h2>Admin Dashboard</h2>
      <p>Index content</p>
    </div>
  );
}
