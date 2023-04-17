/* eslint-disable tailwindcss/no-arbitrary-value */
import {
  AvatarAuto,
  Button,
  ButtonIcon,
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
import { getUserIsAllowed } from "~/helpers";
import { useRootLoaderData } from "~/hooks";
import {
  CreditCard,
  DashboardSpeed,
  Inbox,
  Keyboard,
  LogOut,
  Menu,
  Plus,
  Settings,
  User,
} from "~/icons";
import { cn } from "~/utils";

interface Props {
  noThemeToggle?: boolean;
}

export function SiteHeader({ noThemeToggle }: Props) {
  const { user } = useRootLoaderData();

  return (
    <header
      className={cn(
        "bg-surface-50 dark:bg-surface-900", // background
        "border-b-2 border-surface-100 dark:border-surface-800", // border
        "sticky left-0 right-0 top-0 z-40", // to work with the layout and nprogress
        "w-full py-4"
      )}
    >
      <section
        className={cn(
          "h-6", // height of the site header
          "contain flex items-center justify-between",
          "gap-1 sm:gap-2"
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
          {/* <div className="flex lg:hidden">
            <HeaderSearchButton />
          </div> */}
          <HeaderMainButtons />
          <div className="flex lg:hidden">
            <HeaderNavigationMenu navItems={configSite?.navItems} />
          </div>
          {user && <HeaderUserMenu />}
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
            <ButtonLinkIcon to="/user" variant="outline">
              <Inbox />
              <span className="sr-only">Notification</span>
            </ButtonLinkIcon>

            <ButtonLinkIcon to="/new" variant="outline">
              <Plus />
              <span className="sr-only">New note</span>
            </ButtonLinkIcon>
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
        <ButtonIcon variant="outline">
          <Menu className="size-md" />
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

  const userIsAllowed = getUserIsAllowed(user, ["ADMIN", "MANAGER", "EDITOR"]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <AvatarAuto user={user} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align={align} className="w-56 overflow-scroll">
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
            </RemixNavLink>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <RemixNavLink prefetch="intent" to={`/user/dashboard`}>
              <DashboardSpeed className="size-sm me-2" />
              <span>Dashboard</span>
            </RemixNavLink>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <RemixNavLink to={`/user/settings`}>
              <Settings className="size-sm me-2" />
              <span>Settings</span>
            </RemixNavLink>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <CreditCard className="size-sm me-2" />
            <span>Billing</span>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Inbox className="size-sm me-2" />
            <span>Notifications</span>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Keyboard className="size-sm me-2" />
            <span>Command Palette</span>
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        {userIsAllowed && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <RemixNavLink prefetch="intent" to={`/admin`}>
                  <User className="size-sm me-2" />
                  <span>Admin</span>
                </RemixNavLink>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </>
        )}

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
