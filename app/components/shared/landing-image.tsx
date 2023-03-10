import { Theme, useTheme } from "remix-themes";

export function LandingImage() {
  const [theme] = useTheme();
  const themeName = theme === Theme.DARK ? "dark" : "light";

  return (
    <div>
      <img
        src={`/assets/images/cat-study-${themeName}.png`}
        alt="Cat Study"
        width={300}
        height={300}
      />
    </div>
  );
}
