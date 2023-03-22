import { Outlet } from "@remix-run/react";

import { Layout } from "~/components";
import { noteModel } from "~/models";

import type { SEOHandle } from "~/utils";

export const handle: SEOHandle = {
  getSitemapEntries: async () => {
    const notes = await noteModel.getAllNotes();
    const notesEntries: any = notes.map((note) => {
      return { route: `/notes/${note.id}`, priority: 0.7 };
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
