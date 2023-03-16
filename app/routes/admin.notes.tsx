/* eslint-disable tailwindcss/no-custom-classname */
import { redirect } from "@remix-run/node";
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

import type { ActionArgs } from "@remix-run/node";

export const handle = createSitemap();

export async function action({ request }: ActionArgs) {
  return redirect(`.`);
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
            <Button size="sm" variant="danger">
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
