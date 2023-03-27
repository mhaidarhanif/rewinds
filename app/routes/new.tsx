import { redirect } from "@remix-run/node";

import { requireUserSession } from "~/helpers";

import type { LoaderArgs } from "@remix-run/node";

export async function loader({ request }: LoaderArgs) {
  await requireUserSession(request);
  return redirect("/user/notes/new");
}
