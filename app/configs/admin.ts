/**
 * EDITME: Admin Config
 *
 * Please update getAllDataCount() in all.server.ts
 * for the prisma.model.count() if there's an update in this config
 *
 * This will also affect the ~/routes and ~/models
 */

export const configAdmin = {
  navItems: [
    { to: "users", name: "Users", icon: "home" },

    { to: "notes", name: "Notes", icon: "notes" },
    // { to: "note-statuses", name: "Note Statuses" },
    // { to: "note-categories", name: "Note Categories" },
    // { to: "note-tags", name: "Note Tags" },

    { to: "/", name: " Go to site", icon: "site" },
  ],
};
