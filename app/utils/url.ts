import { useSearchParams } from "@remix-run/react";

// React hooks
export function useRedirectTo() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || undefined;

  return { searchParams, redirectTo };
}

// Utilify for server-side
export function getRedirectTo(request: Request) {
  const url = new URL(request.url);
  const redirectTo = url.searchParams.get("redirectTo") || undefined;

  return redirectTo;
}
