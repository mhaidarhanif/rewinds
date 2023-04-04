/* eslint-disable tailwindcss/no-arbitrary-value */
import {
  AvatarAuto,
  Button,
  ButtonIcon,
  ButtonIconAnchor,
  ButtonLink,
  ButtonLinkIcon,
  buttonVariants,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  Icon,
  Logo,
  RemixLinkText,
  RemixNavLink,
  SearchForm,
  ThemeToggleButton,
} from "~/components";
import { configSite } from "~/configs";
import { useRootLoaderData } from "~/hooks";
import {
  BellNotification,
  CreditCard,
  Github,
  Keyboard,
  LogOut,
  Menu,
  Plus,
  Settings,
  Twitter,
  User,
} from "~/icons";
import { cn } from "~/utils";

interface Props {
  noThemeToggle?: boolean;
}

export function SiteHeader({ noThemeToggle }: Props) {
  return (
    <header
      className={cn(
        "w-full border-b-2 border-surface-300 bg-white py-4 dark:border-surface-700 dark:bg-surface-900",
        "sticky left-0 right-0 top-0 z-40" // to work with the layout and nprogress
      )}
    >
      <section
        className={cn(
          "h-6", // height of the site header
          "contain flex items-center justify-between"
        )}
      >
        <div
          id="site-header-left"
          className="flex w-full items-center gap-1 sm:gap-2"
        >
          <HeaderMainLogo noThemeToggle={noThemeToggle} />
          <HeaderMainNavigation navItems={configSite?.navItems} />
          <div className="hidden w-full lg:flex">
            <SearchForm />
          </div>
        </div>

        <div
          id="site-header-right"
          className="flex items-center gap-1 sm:gap-2"
        >
          <HeaderMainButtons />
          <div className="flex lg:hidden">
            <HeaderNavigationMenu navItems={configSite?.navItems} />
          </div>
        </div>
      </section>
    </header>
  );
}

export function HeaderMainLogo({ noThemeToggle }: { noThemeToggle?: boolean }) {
  return (
    <div className="flex min-w-fit items-center gap-1">
      <RemixNavLink
        to="/"
        className="block min-w-fit transition-opacity hover:opacity-80"
      >
        <Logo />
      </RemixNavLink>

      {!noThemeToggle && <ThemeToggleButton />}
    </div>
  );
}

export function HeaderMainNavigation({
  navItems = configSite.navItems,
}: {
  navItems?: typeof configSite.navItems;
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
                cn(buttonVariants({ variant: "navlink", isActive }))
              }
            >
              <Icon name={item.icon} />
              <span>{item.name}</span>
            </RemixNavLink>
          )
      )}
    </nav>
  );
}

export function HeaderMainButtons() {
  const { user } = useRootLoaderData();

  return (
    <div className="flex grow items-center justify-end space-x-2">
      <nav className="hidden gap-1 xl:flex">
        <ButtonIconAnchor
          href={configSite?.links.github}
          variant="ghost"
          accent="dim"
        >
          <Github />
          <span className="sr-only">GitHub</span>
        </ButtonIconAnchor>
        <ButtonIconAnchor
          href={configSite?.links.twitter}
          variant="ghost"
          accent="dim"
        >
          <Twitter />
          <span className="sr-only">Twitter</span>
        </ButtonIconAnchor>
      </nav>

      <nav className="flex items-center gap-1 sm:gap-2">
        {!user && (
          <>
            <ButtonLink to="/login" variant="ghost">
              Login
            </ButtonLink>

            <ButtonLink to="/register" variant="subtle">
              Register
            </ButtonLink>
          </>
        )}

        {user && (
          <>
            <ButtonLinkIcon to="/user" variant="outline" radius="full">
              <BellNotification />
              <span className="sr-only">Notification</span>
            </ButtonLinkIcon>

            <ButtonLinkIcon to="/new" variant="outline" radius="full">
              <Plus />
              <span className="sr-only">New note</span>
            </ButtonLinkIcon>

            <HeaderUserMenu />
          </>
        )}
      </nav>
    </div>
  );
}

export function HeaderNavigationMenu({
  navItems = configSite.navItems,
  align = "end",
}: {
  navItems?: typeof configSite.navItems;
  align?: "center" | "start" | "end" | undefined;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ButtonIcon variant="ghost" size="lg">
          <Menu className="size-lg" />
          <span className="sr-only font-bold">Menu</span>
        </ButtonIcon>
      </DropdownMenuTrigger>

      <DropdownMenuContent align={align} className="w-56 overflow-scroll">
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
              <DropdownMenuItem key={index} asChild>
                <RemixNavLink to={item.to} prefetch="intent">
                  <div className={cn("flex gap-2")}>
                    <Icon name={item.icon} />
                    <span>{item.name}</span>
                  </div>
                </RemixNavLink>
              </DropdownMenuItem>
            )
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function HeaderUserMenu({
  align = "end",
}: {
  align?: "center" | "start" | "end" | undefined;
}) {
  const { user } = useRootLoaderData();

  if (!user) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <AvatarAuto user={user} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align={align}
        className="w-56 overflow-scroll"
        forceMount
      >
        <DropdownMenuLabel>
          <h5>{user.name}</h5>
          <h6>
            <RemixLinkText prefetch="intent" to={`/${user.username}`}>
              @{user.username}
            </RemixLinkText>
          </h6>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <RemixNavLink prefetch="intent" to={`/${user.username}`}>
              <User className="size-sm me-2" />
              <span>Profile</span>
              <DropdownMenuShortcut>⌘⇧P</DropdownMenuShortcut>
            </RemixNavLink>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <RemixNavLink prefetch="intent" to={`/user/dashboard`}>
              <User className="size-sm me-2" />
              <span>Dashboard</span>
              <DropdownMenuShortcut>⌘⇧D</DropdownMenuShortcut>
            </RemixNavLink>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <RemixNavLink to={`/user/settings`}>
              <Settings className="size-sm me-2" />
              <span>Settings</span>
              <DropdownMenuShortcut>⌘⇧S</DropdownMenuShortcut>
            </RemixNavLink>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <CreditCard className="size-sm me-2" />
            <span>Billing</span>
            <DropdownMenuShortcut>⌘⇧B</DropdownMenuShortcut>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <BellNotification className="size-sm me-2" />
            <span>Notifications</span>
            <DropdownMenuShortcut>⌘⇧O</DropdownMenuShortcut>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Keyboard className="size-sm me-2" />
            <span>Command Palette</span>
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <RemixNavLink to="/logout">
            <LogOut className="size-sm me-2" />
            <span>Log out</span>
          </RemixNavLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
