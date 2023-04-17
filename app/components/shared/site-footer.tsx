import {
  Anchor,
  AnchorText,
  ButtonIconAnchor,
  TextCode,
  ThemeToggleDropdownMenu,
} from "~/components";
import { configMeta, configSite } from "~/configs";
import { Github, Twitter } from "~/icons";
import { cn, getCurrentYear } from "~/utils";

interface Props {
  noThemeToggle?: boolean;
}

export function SiteFooter({ noThemeToggle }: Props) {
  return (
    <footer
      className={cn(
        "bg-surface-50 dark:bg-surface-900", // background
        "border-t-2 border-surface-100 dark:border-surface-800", // border
        "mt-60 py-4 sm:py-8"
      )}
    >
      <section className="contain flex flex-wrap items-end gap-4 sm:justify-between">
        <div className="space-y-4">
          <ul className="space-y-2">
            <li>
              <span>Repo: </span>
              <AnchorText
                href={configSite?.links.github}
                className="py-3 sm:py-0"
              >
                <TextCode>mhaidarhanif/rewinds</TextCode>
              </AnchorText>
            </li>
            <li>
              <span>Demo: </span>
              <AnchorText href={configMeta?.url} className="py-3 sm:py-0">
                {configSite?.domain}
              </AnchorText>
            </li>
          </ul>
          <p className="opacity-80">
            <span>Copyright &copy; </span>
            <span>{getCurrentYear()} </span>
            <Anchor
              href={configMeta?.author.url}
              className="py-3 font-semibold sm:py-0"
            >
              {configMeta?.author.name}
            </Anchor>
          </p>
        </div>

        <div className="flex w-full justify-end gap-1 sm:w-min sm:gap-2">
          <ButtonIconAnchor
            href={configSite?.links.github}
            variant="ghost"
            accent="dim"
          >
            <Github className="fill-current" />
            <span className="sr-only">GitHub</span>
          </ButtonIconAnchor>

          <ButtonIconAnchor
            href={configSite?.links.twitter}
            variant="ghost"
            accent="dim"
          >
            <Twitter className="fill-current" />
            <span className="sr-only">Twitter</span>
          </ButtonIconAnchor>

          {!noThemeToggle && <ThemeToggleDropdownMenu align="end" />}
        </div>
      </section>
    </footer>
  );
}
