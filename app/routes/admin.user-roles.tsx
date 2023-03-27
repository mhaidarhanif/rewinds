import { parse } from "@conform-to/react";
import { json, redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { forbidden } from "remix-utils";

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
import { createSitemap, formatPluralItems } from "~/utils";

import type { ActionArgs } from "@remix-run/node";

export const handle = createSitemap();

export async function loader() {
  const userRolesCount = await model.userRole.query.count();
  return json({ userCount: userRolesCount });
}

export async function action({ request }: ActionArgs) {
  const { user } = await requireUserSession(request);
  if (!requireUserRole(user, ["ADMIN", "MANAGER"])) {
    return forbidden({ message: "Not allowed" });
  }

  const formData = await request.formData();
  const submission = parse(formData, {});

  if (submission.payload.intent === "delete-all-user-roles") {
    // await model.userRole.mutation.deleteAll();
    return json(submission);
  }

  return redirect(`.`);
}

export default function Route() {
  const { userCount } = useLoaderData<typeof loader>();

  return (
    <div>
      <PageAdminHeader size="xs">
        <RemixLink to=".">
          <h1>User Roles</h1>
        </RemixLink>
        <ButtonLink to="new" size="sm">
          <Plus className="size-sm" />
          <span>Add User Role</span>
        </ButtonLink>
        {configDev.isDevelopment && (
          <RemixForm method="delete">
            <Button
              size="sm"
              variant="danger"
              name="intent"
              value="delete-all-user-roles"
              disabled={true || userCount <= 0}
            >
              <Trash className="size-sm" />
              <span>
                Delete All {formatPluralItems("User Role", userCount)}
              </span>
            </Button>
          </RemixForm>
        )}
      </PageAdminHeader>

      <div className="px-layout">
        <Outlet />
      </div>
    </div>
  );
}
