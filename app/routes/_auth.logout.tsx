import { requireUserSession } from "~/helpers";
import { authenticator } from "~/services";

import type { ActionArgs, LoaderArgs } from "@remix-run/node";

export async function action({ request }: ActionArgs) {
  await authenticator.logout(request, { redirectTo: "/login" });
}

export async function loader({ request }: LoaderArgs) {
  await requireUserSession(request);
  await authenticator.logout(request, { redirectTo: "/login" });
}
