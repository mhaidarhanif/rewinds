import {
  Anchor,
  AnchorText,
  TextCode,
  ThemeToggleDropdownMenu,
} from "~/components";
import { configMeta, configSite } from "~/configs";
import { cn, getCurrentYear } from "~/utils";

interface Props {
  noThemeToggle?: boolean;
}

export function SiteFooter({ noThemeToggle }: Props) {
  return (
    <footer
      className={cn(
        "border-t border-surface-200 bg-white dark:border-surface-700 dark:bg-surface-900",
        "mt-60 py-4 sm:py-8"
      )}
    >
      <section className="contain flex flex-wrap items-end gap-4 sm:justify-between">
        <div className="space-y-4">
          <ul data-id="footer-links" className="space-y-2">
            <li>
              <span>Repo: </span>
              <AnchorText href={configSite?.links.github} className="py-2">
                <TextCode>mhaidarhanif/rewinds</TextCode>
              </AnchorText>
            </li>
            <li>
              <span>Demo: </span>
              <AnchorText href={configMeta?.url} className="py-2">
                {configSite?.domain}
              </AnchorText>
            </li>
          </ul>
          <p className="opacity-80">
            <span>Copyright &copy; </span>
            <span>{getCurrentYear()} </span>
            <Anchor href={configMeta?.author.url} className="font-semibold">
              {configMeta?.author.name}
            </Anchor>
          </p>
        </div>

        <div className="flex w-full justify-end sm:w-min">
          {!noThemeToggle && <ThemeToggleDropdownMenu align="end" />}
        </div>
      </section>
    </footer>
  );
}
