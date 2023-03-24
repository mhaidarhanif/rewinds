import type { UserData } from "~/helpers";

// https://dicebear.com/how-to-use/http-api
export function createAvatarPlaceholderURL(user: Pick<UserData, "username">) {
  const styleName = "thumbs";

  const url = new URL(`https://api.dicebear.com/5.x/${styleName}/svg`);

  url.searchParams.append("seed", user.username);
  url.searchParams.append("flip", String(true));

  console.log("url", url.toString());

  return url.toString();
}
