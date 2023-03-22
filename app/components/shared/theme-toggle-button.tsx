import { Theme, useTheme } from "remix-themes";

import { ButtonIcon } from "~/components";
import { Moon, Sun } from "~/icons";

interface Props {
  size?: "xs" | "sm" | "lg" | undefined;
}

// not in components because it depens on the theme config
export function ThemeToggleButton({ size }: Props) {
  const [theme, setTheme] = useTheme();

  const nameTo = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;

  const handleChangeTheme = () => {
    setTheme(nameTo);
  };

  return (
    <ButtonIcon
      size={size}
      variant="ghost"
      onClick={handleChangeTheme}
      aria-label="Toggle theme"
      accent="surface"
    >
      <Sun className="rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle color mode theme</span>
    </ButtonIcon>
  );
}
