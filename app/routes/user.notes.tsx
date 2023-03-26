import { Outlet } from "@remix-run/react";

import { createSitemap } from "~/utils";

export const handle = createSitemap();

export default function UserNotesLayout() {
  return (
    <div data-id="user-notes" className="contain-sm space-y-4">
      <Outlet />
    </div>
  );
}
