import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { model } from "~/models";
import { createSitemap } from "~/utils";

import type { LoaderArgs } from "@remix-run/node";

export const handle = createSitemap();

export async function loader({ request }: LoaderArgs) {
  const userRoles = await model.userRole.query.getAll();
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

      {userRoles.length > 0 && (
        <ul className="stack-v">
          {userRoles.map((userRole) => {
            return (
              <li key={userRole.symbol} className="card-sm">
                <h4>
                  {userRole.name} <b>{userRole.symbol}</b>
                </h4>
                <p>{userRole.description}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
