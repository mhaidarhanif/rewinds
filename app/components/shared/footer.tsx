import {
  Anchor,
  AnchorText,
  TextCode,
  ThemeToggleDropdownMenu,
} from "~/components";
import { configMeta, configSite } from "~/configs";
import { getCurrentYear } from "~/utils";

interface Props {
  noThemeToggle?: boolean;
}

export function SiteFooter({ noThemeToggle }: Props) {
  return (
    <footer className="card contain mt-60 flex flex-wrap items-end gap-4 border-t border-surface-200 py-4 dark:border-surface-700 sm:justify-between">
      <div className="space-y-2">
        <ul data-id="footer-links">
          <li>
            <span>Repo: </span>
            <AnchorText href={configSite?.links.github}>
              <TextCode>mhaidarhanif/rewinds</TextCode>
            </AnchorText>
          </li>
          <li>
            <span>Demo: </span>
            <AnchorText href={configMeta?.url}>{configSite?.domain}</AnchorText>
          </li>
        </ul>
        <p className="opacity-80">
          Copyright &copy; <span>{getCurrentYear()}</span>{" "}
          <Anchor href={configMeta?.author.url}>
            {configMeta?.author.name}
          </Anchor>
        </p>
      </div>

      <div className="flex w-full justify-end sm:w-min">
        {!noThemeToggle && <ThemeToggleDropdownMenu align="end" />}
      </div>
    </footer>
  );
}
