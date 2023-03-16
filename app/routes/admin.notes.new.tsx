import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import {
  Button,
  ButtonLink,
  Debug,
  Input,
  Label,
  RemixForm,
  TextArea,
} from "~/components";
import { Plus } from "~/icons";
import { adminNote } from "~/models";
import { createSitemap } from "~/utils";

import type { LoaderArgs } from "@remix-run/node";
import type { ActionArgs } from "@remix-run/node";

export const handle = createSitemap();

export async function action({ request }: ActionArgs) {
  return redirect(`.`); // TODO: redirect to $noteId
}

export default function AdminNotesNewRoute() {
  return (
    <div data-id="admin-notes" className="stack-v">
      <header className="space-y-2">
        <h3>Add New Note</h3>
      </header>

      <RemixForm method="post" className="card max-w-lg space-y-4">
        <div className="space-y-1">
          <Label htmlFor="title">Title</Label>
          <Input id="title" type="text" placeholder="What's on your mind?" />
        </div>

        <div className="space-y-1">
          <Label htmlFor="content">Content</Label>
          <TextArea
            id="content"
            placeholder="Type your note content here..."
            rows={10}
          />
          <p className="text-sm text-surface-500">
            The note has a maximum content of 1,000 characters.
          </p>
        </div>

        <div className="flex gap-2">
          <Button type="submit" className="grow">
            Save Note
          </Button>
          <Button type="reset" variant="subtle">
            Reset
          </Button>
        </div>
      </RemixForm>

      {/* <Debug name="notes">{notes}</Debug> */}
    </div>
  );
}
