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
    {
      to: "/admin",
      name: "Admin Dashboard",
      icon: "dashboard",
      items: [],
      end: true,
    },

    {
      to: "users",
      name: "Users",
      icon: "users",
      items: [
        {
          to: "user-roles",
          name: "User Roles",
          icon: "userRole",
        },
      ],
    },

    {
      to: "notes",
      name: "Notes",
      icon: "notes",
      items: [
        {
          to: "note-statuses",
          name: "Note Statuses",
          icon: "noteStatus",
        },
        {
          to: "note-categories",
          name: "Note Categories",
          icon: "noteCategory",
        },
        {
          to: "note-tags",
          name: "Note Tags",
          icon: "noteTag",
        },
      ],
    },

    {
      to: "/admin/search",
      name: "Search on Admin",
      icon: "searchAdmin",
      items: [],
    },

    {
      to: "/search",
      name: "Search on Site",
      icon: "search",
      items: [],
    },

    {
      to: "/",
      name: "Go to site",
      icon: "appWindow",
      items: [],
    },
  ],
};
