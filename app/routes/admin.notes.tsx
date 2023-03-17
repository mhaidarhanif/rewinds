/* eslint-disable tailwindcss/no-custom-classname */
import { parse } from "@conform-to/react";
import { json, redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

import {
  Button,
  ButtonLink,
  PageHeader,
  RemixForm,
  RemixLink,
} from "~/components";
import { Plus, Trash } from "~/icons";
import { adminNote } from "~/models";
import { authenticator } from "~/services";
import { createSitemap, invariant } from "~/utils";

import type { ActionArgs } from "@remix-run/node";

export const handle = createSitemap();

export async function action({ request }: ActionArgs) {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  invariant(user); // can use user data for security check later

  const formData = await request.formData();
  const submission = parse(formData, {});

  if (submission.payload.intent === "delete-all-notes") {
    await adminNote.deleteAllNotes();
    return json({ submission });
  }

  return redirect(`/admin/notes`);
}

export default function AdminNotesRoute() {
  return (
    <div data-id="admin-notes-layout">
      <PageHeader size="xs">
        <div className="stack-h-center">
          <RemixLink to=".">
            <h1>Notes</h1>
          </RemixLink>
          <ButtonLink to="new" size="sm">
            <Plus className="size-sm" />
            <span>New note</span>
          </ButtonLink>
          <RemixForm method="delete">
            <Button
              size="sm"
              variant="danger"
              name="intent"
              value="delete-all-notes"
            >
              <Trash className="size-sm" />
              <span>Delete all notes</span>
            </Button>
          </RemixForm>
        </div>
      </PageHeader>

      <div data-id="admin-notes-outlet" className="p-2 sm:p-4">
        <Outlet />
      </div>
    </div>
  );
}
