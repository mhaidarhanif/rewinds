import { Theme, useTheme } from "remix-themes";
import { useMediaQuery } from "usehooks-ts";

import {
  ButtonIcon,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components";
import { Laptop, Moon, Sun } from "~/icons";

const COLOR_SCHEME_QUERY = "(prefers-color-scheme: dark)";

interface Props {
  align?: "center" | "start" | "end" | undefined;
  size?: "xs" | "sm" | "lg" | undefined;
}

// not in components because it depens on the theme config
export function ThemeToggleDropdownMenu({ align = "end", size }: Props) {
  const [, setTheme] = useTheme();
  const isPreferDark = useMediaQuery(COLOR_SCHEME_QUERY);

  function handleChangeTheme(themeName: "dark" | "light" | "system") {
    if (themeName === "dark") setTheme(Theme.DARK);
    if (themeName === "light") setTheme(Theme.LIGHT);
    if (themeName === "system") {
      if (isPreferDark) setTheme(Theme.DARK);
      else setTheme(Theme.LIGHT);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ButtonIcon variant="ghost" accent="dim" size={size}>
          <Sun className="rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle color mode theme</span>
        </ButtonIcon>
      </DropdownMenuTrigger>

      <DropdownMenuContent align={align}>
        <DropdownMenuItem onClick={() => handleChangeTheme("light")}>
          <Sun className="size-sm me-2" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleChangeTheme("dark")}>
          <Moon className="size-sm me-2" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleChangeTheme("system")}>
          <Laptop className="size-sm me-2" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
