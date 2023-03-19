import { Outlet } from "@remix-run/react";

import { Layout } from "~/components";
import { note } from "~/models";

import type { SEOHandle } from "~/utils";

export const handle: SEOHandle = {
  getSitemapEntries: async () => {
    const notes: any = await note.getAllNotes();
    const notesEntries = notes.map((note: any) => {
      return { route: `/notes/${note.id}`, priority: 0.8 };
    });

    return [{ route: `/notes`, priority: 0.8 }, ...notesEntries];
  },
};

export default function NotesRoute() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
