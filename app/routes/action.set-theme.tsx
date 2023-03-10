import { createThemeAction } from "remix-themes";

import { themeSessionResolver } from "~/sessions";

export const action = createThemeAction(themeSessionResolver);
