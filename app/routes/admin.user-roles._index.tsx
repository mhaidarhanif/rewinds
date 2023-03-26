import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Debug } from "~/components";
import { createSitemap } from "~/utils";

import type { LoaderArgs } from "@remix-run/node";

export const handle = createSitemap();

export async function loader({ request }: LoaderArgs) {
  const userRoles: string[] = [];
  return json({ userRoles });
}

export default function Route() {
  const { userRoles } = useLoaderData<typeof loader>();

  return (
    <div className="stack-v">
      <header>
        <span>All User Roles</span>
      </header>

      {userRoles.length <= 0 && <span>No user roles. Please add.</span>}

      <Debug name="userRoles">{userRoles}</Debug>
    </div>
  );
}
