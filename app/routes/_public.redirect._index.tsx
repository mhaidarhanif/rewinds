import { redirect } from "@remix-run/node";

import type { LoaderArgs } from "@remix-run/node";

export async function loader({ request }: LoaderArgs) {
  return redirect("https://example.com");
}
