import { json } from "@remix-run/node";

import {
  Alert,
  Anchor,
  AnchorText,
  Badge,
  Breadcrumb,
  BreadcrumbAuto,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  ButtonAnchor,
  ButtonIcon,
  ButtonLink,
  ButtonLoading,
  ButtonCopy,
  HeaderNavigationMenu,
  Input,
  InputPassword,
  Label,
  Layout,
  Logo,
  PageHeader,
  RemixForm,
  RemixLink,
  RemixLinkText,
  TextArea,
  ToastAction,
} from "~/components";
import { useToast } from "~/hooks";
import {
  ArrowRight,
  Calendar,
  CheckCircle,
  EditPencil,
  GitCommit,
  Loader2,
  Mail,
  Star,
  Trash,
} from "~/icons";
import { createMetaData, createSitemap } from "~/utils";

import type { ActionArgs, LoaderArgs } from "@remix-run/node";

export const meta = createMetaData({
  title: "Components",
  description: "Several components already made.",
});

export const handle = createSitemap("/examples", 0.9);

export async function loader({ request }: LoaderArgs) {
  return json({});
}

export async function action({ request }: ActionArgs) {
  return json({});
}

export default function Route() {
  return (
    <Layout
      isSpaced
      layoutHeader={
        <PageHeader>
          <h1>Components</h1>
          <p>Like a kitchen sink to see all the components.</p>
        </PageHeader>
      }
    >
      <div className="stack-lg">
        <header>
          <h2>UI</h2>
          <p>Basic and primitive UI components.</p>
        </header>
        <ExampleLink />
        <ExampleButton />
        <ExampleButtonIcon />
        <ExampleBadge />
        <ExampleAlert />
        <ExampleToast />
        <ExampleBreadcrumb />
      </div>

      <div className="stack">
        <header>
          <h2>Shared</h2>
          <p>Shared and combined components.</p>
        </header>
        <ExampleLogo />
        <ExampleForm />
      </div>
    </Layout>
  );
}

export function ExampleLink() {
  return (
    <section id="example-button" className="card space-y-8">
      <h3>Link / Anchor</h3>

      <div className="stack">
        <h4>Link</h4>
        <div className="queue-center">
          <RemixLink to="/">Link without style</RemixLink>
          <RemixLinkText to="/about">Link text with style</RemixLinkText>
          <ButtonLink size="xs" to="/">
            Button Link
          </ButtonLink>
        </div>
      </div>

      <div className="stack">
        <h4>Anchor</h4>
        <div className="queue-center">
          <Anchor href="http://example.com">Anchor without style</Anchor>
          <AnchorText href="http://example.com">Anchor with style</AnchorText>
          <ButtonAnchor size="xs" href="http://example.com">
            Button Anchor
          </ButtonAnchor>
        </div>
      </div>
    </section>
  );
}

export function ExampleButton() {
  return (
    <section id="example-button" className="card space-y-8">
      <h3>Button</h3>

      <div className="stack">
        <h4>Variant</h4>
        <div className="queue-center">
          <Button>Default</Button>
          <Button variant="info">Info</Button>
          <Button variant="success">Success</Button>
          <Button variant="warning">Warn</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="subtle">Subtle</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>

      <div className="stack">
        <h4>Accent</h4>
        <div className="queue-center">
          <Button variant="ghost">Default</Button>
          <Button variant="ghost" accent="dim">
            Dim
          </Button>
          <Button variant="ghost" accent="red">
            Red
          </Button>
          <Button variant="ghost" accent="green">
            Green
          </Button>
          <Button variant="ghost" accent="blue">
            Blue
          </Button>
        </div>
      </div>

      <div className="stack">
        <h4>Size</h4>
        <div className="queue-center">
          <Button size="xs">Extra Small</Button>
          <Button size="sm">Small</Button>
          <Button>Default</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>

      <div className="stack">
        <h4>With Icon</h4>
        <div className="queue-center">
          <Button size="sm">
            <Mail className="size-sm" />
            <span>Login with Email</span>
          </Button>
          <Button size="sm" variant="success">
            <span>Mark as Complete</span>
            <CheckCircle className="size-sm" />
          </Button>
          <Button size="xs" variant="info">
            <EditPencil className="size-xs" />
            <span>Edit</span>
          </Button>
          <Button size="xs" variant="danger">
            <Trash className="size-xs" />
            <span>Delete</span>
          </Button>
          <ButtonCopy
            variant="ghost"
            size="sm"
            contentToCopy="Content to copy"
            withText
          />
        </div>
      </div>

      <div className="stack">
        <h4>With Loading Icon</h4>
        <div className="queue-center">
          <Button size="sm" disabled>
            <Loader2 className="size-sm animate-spin" />
            <span>Loading...</span>
          </Button>
          <ButtonLoading isSubmitting={true} loadingText="Button is loading...">
            Button is not loading
          </ButtonLoading>
        </div>
      </div>
    </section>
  );
}

export function ExampleButtonIcon() {
  return (
    <section id="example-button-icon" className="card space-y-8">
      <h3>Button Icon</h3>

      <div className="stack">
        <h4>Variant</h4>
        <div className="queue-center">
          <ButtonIcon>
            <Star className="size-md" />
          </ButtonIcon>
          <ButtonIcon variant="info">
            <Star className="size-md" />
          </ButtonIcon>
          <ButtonIcon variant="success">
            <Star className="size-md" />
          </ButtonIcon>
          <ButtonIcon variant="warning">
            <Star className="size-md" />
          </ButtonIcon>
          <ButtonIcon variant="danger">
            <Star className="size-md" />
          </ButtonIcon>
          <ButtonIcon variant="subtle">
            <Star className="size-md" />
          </ButtonIcon>
          <ButtonIcon variant="outline">
            <Star className="size-md" />
          </ButtonIcon>
          <ButtonIcon variant="ghost">
            <Star className="size-md" />
          </ButtonIcon>
          <ButtonIcon variant="link">
            <Star className="size-md" />
          </ButtonIcon>
        </div>
      </div>

      <div className="stack">
        <h4>Size</h4>
        <div className="queue-center">
          <ButtonIcon size="xs">
            <Star className="size-xs" />
          </ButtonIcon>
          <ButtonIcon size="sm">
            <Star className="size-sm" />
          </ButtonIcon>
          <ButtonIcon>
            <Star className="size-md" />
          </ButtonIcon>
          <ButtonIcon size="lg">
            <Star className="size-lg" />
          </ButtonIcon>
        </div>
      </div>

      <div className="stack">
        <h4>Use Case</h4>
        <div className="flex">
          <HeaderNavigationMenu align="start" />
        </div>
      </div>
    </section>
  );
}

export function ExampleBadge() {
  return (
    <section id="example-badge" className="card space-y-8">
      <h3>Badge</h3>

      <div className="stack">
        <h4>Variant</h4>
        <div className="queue-center">
          <Badge>Default</Badge>
          <Badge variant="brand">Brand</Badge>
          <Badge variant="surface">Surface</Badge>
          <Badge variant="danger">Danger</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>

        <div className="stack">
          <h4>Size</h4>
          <div className="queue-center">
            <Badge size="sm">Small</Badge>
            <Badge>Default</Badge>
            <Badge size="lg">Large</Badge>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ExampleLogo() {
  return (
    <section id="example-logo" className="card space-y-8">
      <h3>Logo</h3>

      <div className="stack">
        <h4>Accent</h4>
        <div className="queue-center">
          <Logo />
          <Logo accent="brand" />
        </div>
      </div>

      <div className="stack">
        <h4>Size</h4>
        <div className="queue-center">
          <Logo size="xs" />
          <Logo size="sm" />
          <Logo />
          <Logo size="lg" />
        </div>
      </div>
    </section>
  );
}

export function ExampleAlert() {
  return (
    <section id="example-alert" className="card space-y-8">
      <h3>Alert</h3>

      <div className="stack">
        <h4>Variant</h4>
        <div className="stack max-w-xs">
          <Alert>Alert default.</Alert>
          <Alert variant="info">Alert info.</Alert>
          <Alert variant="success">Alert success.</Alert>
          <Alert variant="warning">Alert warning.</Alert>
          <Alert variant="danger">Alert danger.</Alert>
        </div>
      </div>

      <div className="stack">
        <h4>Size</h4>
        <div className="stack max-w-xs">
          <Alert size="sm">Alert small.</Alert>
          <Alert>Alert medium default.</Alert>
          <Alert size="lg">Alert large.</Alert>
        </div>
      </div>
    </section>
  );
}

export function ExampleToast() {
  const { toast } = useToast();

  function handleToastDefault() {
    toast({
      title: "Scheduled: Catch up",
      description: "Friday, February 10, 2023 at 5:57 PM",
      action: <ToastAction altText="Go to schedule to undo">Undo</ToastAction>,
    });
  }

  function handleToastSuccess() {
    toast({ title: "Completed!", variant: "success" });
  }

  function handleToastDanger() {
    toast({ title: "Deleted!", variant: "danger" });
  }

  return (
    <section id="example-toast" className="card space-y-8">
      <h3>Toast</h3>

      <div className="stack">
        <h4>Variant</h4>
        <div className="queue-center">
          <Button size="sm" onClick={handleToastDefault}>
            <Calendar className="size-sm" />
            <span>Add to calendar</span>
          </Button>
          <Button size="sm" variant="success" onClick={handleToastSuccess}>
            <CheckCircle className="size-sm" />
            <span>Complete</span>
          </Button>
          <Button size="sm" variant="danger" onClick={handleToastDanger}>
            <Trash className="size-sm" />
            <span>Delete</span>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function ExampleBreadcrumb() {
  return (
    <section id="example-breadcrumb" className="card space-y-8">
      <h3>Breadcrumb</h3>

      <div className="stack">
        <h4>Default</h4>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink to="/">App</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink to="/components">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink to="/components/breadcrumb">
              Breadcrumb
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>

      <div className="stack">
        <h4>Custom Separator</h4>
        <Breadcrumb separator="/">
          <BreadcrumbItem>
            <BreadcrumbLink to="/">App</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink to="/components">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink to="/components/breadcrumb">
              Breadcrumb
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>

      <div className="stack">
        <h4>Routing Link</h4>
        <div className="stack">
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink as={RemixLink} to="/">
                <Logo size="xs" />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink as={RemixLink} to="/components">
                Components
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink
                as={RemixLink}
                to="/components#example-breadcrumb"
              >
                Breadcrumb
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>

          <Breadcrumb separator={<ArrowRight className="size-sm" />}>
            <BreadcrumbItem>
              <BreadcrumbLink as={RemixLink} to="/">
                App
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink as={RemixLink} to="/components">
                Components
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink
                as={RemixLink}
                to="/components#example-breadcrumb"
              >
                Breadcrumb
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
      </div>

      <div className="stack">
        <h4>Auto Generate</h4>
        <div className="stack">
          <BreadcrumbAuto
            items={[
              { to: "/", name: "App" },
              { to: "/page", name: "Page" },
              { to: "/page/example", name: "Example" },
            ]}
          />
          <BreadcrumbAuto
            separator={<GitCommit className="size-sm" />}
            items={[
              { to: "/", name: "App" },
              { to: "/page", name: "Page" },
              { to: "/page/example", name: "Example", isCurrentPage: true },
            ]}
          />
        </div>
      </div>
    </section>
  );
}

export function ExampleBlank() {
  return (
    <section id="example-blank" className="card space-y-8">
      <h3>Blank</h3>

      <div className="stack">
        <h4>Variant</h4>
        <div className="queue-center">
          <p>...</p>
        </div>
      </div>
    </section>
  );
}

export function ExampleForm() {
  return (
    <section id="example-button" className="card space-y-8">
      <header>
        <h3>Form</h3>
      </header>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
        <RemixForm method="POST" className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="example-email">Email</Label>
            <Input
              type="email"
              id="example-email"
              placeholder="name@example.com"
            />
            <p className="text-sm text-surface-500">
              Your most active email address
            </p>
          </div>

          <div className="space-y-1">
            <Label htmlFor="example-password">Password</Label>
            <InputPassword id="example-password" />
            <p className="text-sm text-surface-500">At least 8 characters</p>
          </div>

          <div className="space-y-1">
            <Label htmlFor="example-message">Message</Label>
            <TextArea
              id="example-message"
              placeholder="Type your message here..."
              rows={5}
            />
            <p className="text-sm text-surface-500">
              Your message will be sent to our team
            </p>
          </div>

          <div className="queue-center">
            <Button type="submit" className="grow">
              Submit Form
            </Button>
            <Button type="reset" variant="subtle">
              Reset
            </Button>
          </div>
        </RemixForm>
      </div>
    </section>
  );
}
