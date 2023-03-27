import { Outlet } from "@remix-run/react";

import { model } from "~/models";
import { formatDateLastMod } from "~/utils";

import type { SEOHandle } from "~/utils";

export const handle: SEOHandle = {
  getSitemapEntries: async () => {
    const users = await model.user.query.getAllUsernames();
    return users.map((user) => {
      return {
        route: `/${user.username}`,
        priority: 0.7,
        lastmod: formatDateLastMod(user.updatedAt),
      };
    });
  },
};

export default function Route() {
  return <Outlet />;
}
