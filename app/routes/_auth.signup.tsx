import { redirect } from "@remix-run/node";

import { createSitemap } from "~/utils";

export const handle = createSitemap();

export async function loader() {
  return redirect("/register");
}
