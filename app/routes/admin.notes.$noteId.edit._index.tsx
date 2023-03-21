import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import {
  Button,
  ButtonLink,
  Input,
  Label,
  RemixForm,
  TextArea,
} from "~/components";
import { adminNote } from "~/models";
import { createSitemap, invariant } from "~/utils";

import type { LoaderArgs } from "@remix-run/node";
import type { ActionArgs } from "@remix-run/node";

export const handle = createSitemap();

export async function loader({ params }: LoaderArgs) {
  const { noteId } = params;
  invariant(noteId, "noteId does not exist");

  const note = await adminNote.getNote({ id: noteId });
  return json({ note });
}

export async function action({ params }: ActionArgs) {
  const { noteId } = params;
  invariant(noteId, "noteId does not exist");

  return redirect(`/admin/notes/${noteId}`);
}

// Similar with "admin-notes-view"
export default function AdminNotesEditRoute() {
  const { note } = useLoaderData<typeof loader>();

  if (!note) {
    return <p>Note does not exist.</p>;
  }

  return (
    <div data-id="admin-notes-edit" className="stack-v">
      <header>
        <span>Edit Note</span>
      </header>

      <RemixForm method="put" className="card stack-v max-w-lg">
        <header>
          <div className="flex flex-wrap gap-2 text-xs opacity-50">
            <p>
              ID: <b>{note.id}</b>
            </p>
            <p>
              Slug: <b>{note.slug}</b>
            </p>
          </div>

          <div className="space-y-1">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              type="text"
              placeholder="What's on your mind?"
              defaultValue={note.title}
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              type="text"
              placeholder="Short description"
              defaultValue={note.description}
            />
          </div>
        </header>

        <div className="space-y-1">
          <Label htmlFor="content">Content</Label>
          <TextArea
            id="content"
            placeholder="Type your note content here..."
            rows={10}
            defaultValue={note.content}
          />
          <p className="text-sm text-surface-500">
            The note has a maximum content length of 1,000 characters.
          </p>
        </div>

        <div className="flex gap-2">
          <Button type="submit" variant="subtle" className="grow">
            Save Note
          </Button>
          <Button type="reset" variant="ghost">
            <span>Reset</span>
          </Button>
          <ButtonLink
            to={`/admin/notes/${note.id}`}
            variant="link"
            accent="red"
          >
            <span>Cancel</span>
          </ButtonLink>
        </div>
      </RemixForm>

      {/* <Debug name="note">{note}</Debug> */}
    </div>
  );
}
