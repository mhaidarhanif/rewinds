import { json, redirect } from "@remix-run/node";
import { useCatch, useLoaderData } from "@remix-run/react";

import { Button, RemixForm } from "~/components";
import { deleteNote, getNote } from "~/models";
import { requireUserId } from "~/sessions";
import { invariant } from "~/utils";

import type { ActionArgs, LoaderArgs } from "@remix-run/node";

export async function loader({ request, params }: LoaderArgs) {
  const userId = await requireUserId(request);
  invariant(params.noteId, "noteId is not found");

  const note = await getNote({ userId, id: params.noteId });
  if (!note) {
    throw new Response("Note is Not Found", { status: 404 });
  }
  return json({ note });
}

export async function action({ request, params }: ActionArgs) {
  const userId = await requireUserId(request);
  invariant(params.noteId, "noteId is not found");

  await deleteNote({ userId, id: params.noteId });

  return redirect("/notes");
}

export default function NoteDetailsRoute() {
  const { note } = useLoaderData<typeof loader>();

  return (
    <div>
      <div className="hidden">
        <span>ID: {note.id}</span>
        <span>Slug: {note.slug}</span>
      </div>

      <h3>{note.title}</h3>
      <p>{note.description}</p>

      <div>{note.content}</div>

      <RemixForm method="post">
        <Button type="submit">Delete</Button>
      </RemixForm>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return <div>An unexpected error occurred: {error.message}</div>;
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <div>Note not found</div>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
