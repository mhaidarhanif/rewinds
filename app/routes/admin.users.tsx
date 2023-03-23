import { parse } from "@conform-to/react";
import { json, redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";

import {
  Button,
  ButtonLink,
  PageAdminHeader,
  RemixForm,
  RemixLink,
} from "~/components";
import { configDev } from "~/configs";
import { requireUserRole, requireUserSession } from "~/helpers";
import { Plus, Trash } from "~/icons";
import { model } from "~/models";
import { createSitemap } from "~/utils";

import type { ActionArgs } from "@remix-run/node";

export const handle = createSitemap();

export async function loader() {
  const userCount = await model.adminUser.query.count();
  return json({ userCount });
}

export async function action({ request }: ActionArgs) {
  const { user } = await requireUserSession(request);
  if (!requireUserRole(user, ["ADMIN", "MANAGER"])) {
    return json({ message: "Not allowed" }, { status: 400 });
  }

  const formData = await request.formData();
  const submission = parse(formData, {});

  if (submission.payload.intent === "delete-all-users") {
    await model.adminUser.mutation.deleteAll();
    return json(submission);
  }

  return redirect(`.`);
}

export default function AdminUsersRoute() {
  const { userCount } = useLoaderData<typeof loader>();

  return (
    <div data-id="admin-users">
      <PageAdminHeader size="xs">
        <RemixLink to=".">
          <h1>Users</h1>
        </RemixLink>
        <ButtonLink to="new" size="sm">
          <Plus className="size-sm" />
          <span>New user</span>
        </ButtonLink>
        {configDev.isDevelopment && (
          <RemixForm method="delete">
            <Button
              size="sm"
              variant="danger"
              name="intent"
              value="delete-all-users"
              disabled={userCount <= 0}
            >
              <Trash className="size-sm" />
              <span>Delete all users</span>
            </Button>
          </RemixForm>
        )}
      </PageAdminHeader>

      <div data-id="admin-users-outlet" className="px-layout">
        <Outlet />
      </div>
    </div>
  );
}
