import { json, redirect } from "@remix-run/node";
import { useCatch, useLoaderData } from "@remix-run/react";

import { Button, RemixForm } from "~/components";
import { deleteNote, getNote } from "~/models";
import { requireUserId } from "~/sessions";
import { invariant } from "~/utils";

import type { ActionArgs, LoaderArgs } from "@remix-run/node";

export async function loader({ request, params }: LoaderArgs) {
  const userId = await requireUserId(request);
  invariant(params.noteId, "noteId not found");

  const note = await getNote({ userId, id: params.noteId });
  if (!note) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ note });
}

export async function action({ request, params }: ActionArgs) {
  const userId = await requireUserId(request);
  invariant(params.noteId, "noteId not found");

  await deleteNote({ userId, id: params.noteId });

  return redirect("/notes");
}

export default function NoteDetailsPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <h3>{data.note.title}</h3>
      <p>{data.note.body}</p>
      <hr />
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
