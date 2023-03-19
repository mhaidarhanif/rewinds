import { redirect } from "@remix-run/node";

import { authorizeUser } from "~/helpers";

import type { LoaderArgs } from "@remix-run/node";

export async function loader({ request }: LoaderArgs) {
  const user = await authorizeUser(request);

  return redirect(`/${user.username}`);
}
