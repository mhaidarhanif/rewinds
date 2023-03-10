import { Theme, useTheme } from "remix-themes";

import { ButtonIcon } from "~/components";
import { Moon, Sun } from "~/icons";

export function ThemeToggleButton() {
  const [theme, setTheme] = useTheme();

  const nameTo = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;

  const handleChangeTheme = () => {
    setTheme(nameTo);
  };

  return (
    <ButtonIcon variant="ghost" onClick={handleChangeTheme} aria-label="Toggle theme">
      <Sun className="rotate-0 scale-100 transition-all hover:text-surface-900 dark:-rotate-90 dark:scale-0 dark:text-surface-400 dark:hover:text-surface-100" />
      <Moon className="absolute rotate-90 scale-0 transition-all hover:text-surface-900 dark:rotate-0 dark:scale-100 dark:text-surface-400 dark:hover:text-surface-100" />
      <span className="sr-only">Toggle color theme</span>
    </ButtonIcon>
  );
}
