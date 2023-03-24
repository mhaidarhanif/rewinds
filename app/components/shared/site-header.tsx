/* eslint-disable tailwindcss/no-arbitrary-value */
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  ButtonIcon,
  ButtonIconAnchor,
  ButtonLink,
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
  Input,
  Label,
  Logo,
  RemixForm,
  RemixLinkText,
  RemixNavLink,
} from "~/components";
import { ThemeToggleButton } from "~/components";
import { configSite } from "~/configs";
import { useRootLoaderData } from "~/hooks";
import {
  CreditCard,
  Github,
  Keyboard,
  LogOut,
  Menu,
  Search,
  Settings,
  Twitter,
  User,
} from "~/icons";
import { cn, getInitials } from "~/utils";

interface Props {
  noThemeToggle?: boolean;
}

export function SiteHeader({ noThemeToggle }: Props) {
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
          "contain flex items-center justify-between",
          "h-6 sm:h-8" // height of the site header
        )}
      >
        <div
          id="site-header-left"
          data-id="site-header-left"
          className="flex items-center gap-1 sm:gap-2"
        >
          <HeaderMainLogo noThemeToggle={noThemeToggle} />
          <HeaderMainNavigation navItems={configSite?.navItems} />
          <div className="hidden lg:flex">
            <HeaderMainSearch />
          </div>
        </div>

        <div
          id="site-header-right"
          data-id="site-header-right"
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

export function HeaderMainSearch() {
  return (
    <RemixForm method="get" action="/search">
      <fieldset className="relative flex items-center gap-1">
        <Label className="sr-only">Search</Label>
        <Input
          name="q"
          type="search"
          placeholder="Search..."
          autoComplete="off"
          className="block w-full pl-9 placeholder:text-surface-500 dark:placeholder:text-surface-400"
        />
        <span className="pointer-events-none absolute flex pl-3">
          <Search className="size-sm" />
        </span>
      </fieldset>
    </RemixForm>
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
        {!user && (
          <>
            <ButtonLink variant="ghost" to="/login">
              Login
            </ButtonLink>
            <ButtonLink variant="subtle" to="/register">
              Register
            </ButtonLink>
          </>
        )}

        {user && <HeaderUserMenu />}
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
                <RemixNavLink
                  to={item.to}
                  prefetch="intent"
                  className={({ isActive }) =>
                    cn(buttonVariants({ variant: "navlink", isActive }))
                  }
                >
                  <Icon name={item.icon} />
                  <span>{item.name}</span>
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
          <Avatar>
            <AvatarImage
              src={`https://github.com/mhaidarhanif.png`}
              alt={user.name}
            />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
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
              <User className="size-sm mr-2" />
              <span>Profile</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </RemixNavLink>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <RemixNavLink prefetch="intent" to={`/user/dashboard`}>
              <User className="size-sm mr-2" />
              <span>Dashboard</span>
              <DropdownMenuShortcut>⇧⌘D</DropdownMenuShortcut>
            </RemixNavLink>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <RemixNavLink to={`/user/settings`}>
              <Settings className="size-sm mr-2" />
              <span>Settings</span>
              <DropdownMenuShortcut>⇧⌘S</DropdownMenuShortcut>
            </RemixNavLink>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <CreditCard className="size-sm mr-2" />
            <span>Billing</span>
            <DropdownMenuShortcut>⇧⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Keyboard className="size-sm mr-2" />
            <span>Command Palette</span>
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <RemixNavLink to="/logout">
            <LogOut className="size-sm mr-2" />
            <span>Log out</span>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </RemixNavLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
