import { json } from "@remix-run/node";

export async function loader() {
  return json({
    message: "ping",
    success: true,
  });
}
