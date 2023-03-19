/* eslint-disable tailwindcss/no-arbitrary-value */
import {
  ButtonIcon,
  ButtonIconAnchor,
  ButtonLink,
  buttonVariants,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Icon,
  Logo,
  RemixNavLink,
} from "~/components";
import { ThemeToggleButton } from "~/components";
import { configSite } from "~/configs";
import { Github, Menu, Twitter } from "~/icons";
import { cn } from "~/utils";

interface Props {
  noThemeToggle?: boolean;
}

export function SiteHeader({ noThemeToggle }: Props) {
  const isAuthenticated = false;

  return (
    <header
      className={cn(
        "border-b border-surface-200 bg-white dark:border-surface-700 dark:bg-surface-900",
        "w-full border-b py-4",
        "sticky top-0 left-0 right-0 z-40" // to work with the layout and nprogress
      )}
    >
      <section
        className={cn(
          "contain flex items-center justify-between gap-1 sm:gap-2",
          "h-6 sm:h-8" // height of the site header
        )}
      >
        <div className="flex w-full items-center justify-between gap-1 sm:gap-2">
          <NavigationMain noThemeToggle={noThemeToggle} />
          <NavigationMainItems navItems={configSite?.navItems} />
          <NavigationButtons isAuthenticated={isAuthenticated} />
        </div>

        <div className="flex lg:hidden">
          <NavigationDropdownMenu navItems={configSite?.navItems} />
        </div>
      </section>
    </header>
  );
}

export function NavigationMain({ noThemeToggle }: { noThemeToggle?: boolean }) {
  return (
    <div className="stack-h-center gap-1 lg:gap-2">
      <RemixNavLink
        to="/"
        prefetch="intent"
        className="transition-opacity hover:opacity-80"
      >
        <Logo />
      </RemixNavLink>

      {!noThemeToggle && <ThemeToggleButton />}
    </div>
  );
}

export function NavigationMainItems({
  navItems,
}: {
  navItems: typeof configSite.navItems;
}) {
  return (
    <nav className="hidden gap-1 lg:flex">
      {navItems?.map(
        (item, index) =>
          item?.to && (
            <RemixNavLink
              key={index}
              to={item.to}
              prefetch="intent"
              className={({ isActive }) =>
                cn(
                  "flex gap-2 p-2",
                  buttonVariants({
                    variant: "navlink",
                    radius: "default",
                    weight: "default",
                    size: "default",
                    isActive,
                  })
                )
              }
            >
              <Icon name={item.icon} />
              <span>{item.title}</span>
            </RemixNavLink>
          )
      )}
    </nav>
  );
}

export function NavigationButtons({
  isAuthenticated,
}: {
  isAuthenticated?: boolean;
}) {
  return (
    <div className="flex grow items-center justify-end space-x-2">
      <nav className="hidden gap-1 md:flex">
        <ButtonIconAnchor
          href={configSite?.links.github}
          variant="ghost"
          accent="surface"
        >
          <Github />
          <span className="sr-only">GitHub</span>
        </ButtonIconAnchor>
        <ButtonIconAnchor
          href={configSite?.links.twitter}
          variant="ghost"
          accent="surface"
        >
          <Twitter />
          <span className="sr-only">Twitter</span>
        </ButtonIconAnchor>
      </nav>

      <nav className="flex items-center gap-1">
        {!isAuthenticated && (
          <>
            <ButtonLink variant="ghost" to="/login" className="hidden md:flex">
              Login
            </ButtonLink>
            <ButtonLink variant="subtle" to="/register" className="flex">
              Register
            </ButtonLink>
          </>
        )}
        {isAuthenticated && (
          <>
            <ButtonLink variant="outline" to="/user" className="flex">
              User
            </ButtonLink>
          </>
        )}
      </nav>
    </div>
  );
}

export function NavigationDropdownMenu({
  isAuthenticated,
  navItems,
}: {
  isAuthenticated?: boolean;
  navItems: typeof configSite.navItems;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ButtonIcon variant="ghost" className="lg:hidden">
          <Menu />
          <span className="sr-only font-bold">Menu</span>
        </ButtonIcon>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        sideOffset={26}
        className="mr-2 w-[250px] overflow-scroll sm:mr-4"
      >
        <DropdownMenuLabel>
          <RemixNavLink
            to="/"
            prefetch="intent"
            className="transition-opacity hover:opacity-80"
          >
            <Logo size="sm" accent="muted" />
          </RemixNavLink>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {navItems?.map(
          (item, index) =>
            item.to && (
              <DropdownMenuItem key={index} asChild className="cursor-pointer">
                <RemixNavLink to={item.to} prefetch="intent">
                  {item.title}
                </RemixNavLink>
              </DropdownMenuItem>
            )
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
