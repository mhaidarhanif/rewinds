import { Outlet } from "@remix-run/react";

import { model } from "~/models";

import type { SEOHandle } from "~/utils";

export const handle: SEOHandle = {
  getSitemapEntries: async () => {
    const notes = await model.note.query.getAll();
    const notesEntries: any = notes.map((note) => {
      return { route: `/${note.user.username}/${note.slug}`, priority: 0.7 };
    });

    return [{ route: `/notes`, priority: 0.8 }, ...notesEntries];
  },
};

export default function Notes() {
  return <Outlet />;
}
