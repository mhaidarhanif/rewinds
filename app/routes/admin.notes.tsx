import { json } from "@remix-run/node";
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";

import { ButtonLink, Layout } from "~/components";
import { useUser } from "~/helpers";
import { adminNote } from "~/models";
import { cn, createSitemap } from "~/utils";

import type { LoaderArgs } from "@remix-run/node";

export const handle = createSitemap();

export async function loader({ request }: LoaderArgs) {
  const notes = await adminNote.getAllNotes();
  return json({ notes });
}

export default function AdminNotesRoute() {
  const { notes } = useLoaderData<typeof loader>();
  const user = useUser();

  return (
    <Layout>
      <header>
        <h1>
          <Link to=".">Notes</Link>
        </h1>
        <p>{user.email}</p>
        <Form action="/logout" method="post">
          <button type="submit">Logout</button>
        </Form>
      </header>

      <main>
        <div>
          <ButtonLink to="new">Add Note</ButtonLink>

          {notes.length <= 0 && <p>No notes yet</p>}
          {notes.length > 0 && (
            <ol>
              {notes.map((note) => (
                <li key={note.id}>
                  <NavLink
                    to={note.id}
                    className={({ isActive }) =>
                      cn("block", isActive && "bg-white")
                    }
                  >
                    <span>{note.title}</span>
                  </NavLink>
                </li>
              ))}
            </ol>
          )}
        </div>

        <div data-id="notes-layout-outlet">
          <Outlet />
        </div>
      </main>
    </Layout>
  );
}
