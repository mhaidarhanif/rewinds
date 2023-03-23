import { redirect } from "@remix-run/node";

import { requireUserSession } from "~/helpers";

import type { LoaderArgs } from "@remix-run/node";

export async function loader({ request }: LoaderArgs) {
  const { user } = await requireUserSession(request);
  if (!user) {
    return redirect(`/login`);
  }
  return redirect(`/${user.username}`);
}
