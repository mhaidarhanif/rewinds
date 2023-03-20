import { authorizeUser, deauthenticateUser } from "~/helpers";

import type { ActionArgs, LoaderArgs } from "@remix-run/node";

export async function action({ request }: ActionArgs) {
  await deauthenticateUser(request, "/login");
}

export async function loader({ request }: LoaderArgs) {
  await authorizeUser(request);

  await deauthenticateUser(request, "/login");
}
