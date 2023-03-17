import { json } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

import {
  Button,
  ButtonLink,
  PageHeader,
  RemixForm,
  RemixLink,
} from "~/components";
import { Plus, Trash } from "~/icons";
import { createSitemap } from "~/utils";

import type { LoaderArgs } from "@remix-run/node";

export const handle = createSitemap();

export async function loader({ request }: LoaderArgs) {
  return json({});
}

export default function AdminUsersRoute() {
  return (
    <div data-id="admin-users">
      <PageHeader size="xs">
        <div className="stack-h-center">
          <RemixLink to=".">
            <h1>Users</h1>
          </RemixLink>
          <ButtonLink to="new" size="sm">
            <Plus className="size-sm" />
            <span>New user</span>
          </ButtonLink>
          <RemixForm method="delete">
            <Button
              size="sm"
              variant="danger"
              name="intent"
              value="delete-all-users"
            >
              <Trash className="size-sm" />
              <span>Delete all users</span>
            </Button>
          </RemixForm>
        </div>
      </PageHeader>

      <div data-id="admin-users-outlet" className="p-2 sm:p-4">
        <Outlet />
      </div>
    </div>
  );
}
