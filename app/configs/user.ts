/**
 * EDITME: User Config
 *
 * Please update getAllDataCount() in all.server.ts
 * for the prisma.model.count() if there's an update in this config
 *
 * This will also affect the ~/routes and ~/models
 */

export const configUser = {
  navigationItems: [
    { to: "notes", slug: "notes", name: "Notes" },
    // { to: "note-categories", name: "Note Categories" },
    // { to: "note-tags", name: "Note Tags" },
  ],
};
