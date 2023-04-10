import { configDev } from "~/configs";
import { prisma } from "~/libs";

import { HttpStatus } from "~/utils";

import type { LoaderArgs } from "@remix-run/node";

export async function loader({ request }: LoaderArgs) {
  const host =
    request.headers.get("X-Forwarded-Host") ?? request.headers.get("host");

  try {
    const url = new URL(
      "/",
      configDev.isDevelopment ? `http://${host}` : `https://${host}`
    );
    // if we can connect to the database and make a simple query
    // and make a HEAD request to ourselves, then we're good.
    await Promise.all([
      prisma.note.findFirst(),
      fetch(url.toString(), { method: "HEAD" }).then((r) => {
        if (!r.ok) return Promise.reject(r);
      }),
    ]);
    return new Response("OK");
  } catch (error: unknown) {
    console.info("Health Check ❌", { error });
    return new Response("ERROR", { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}
