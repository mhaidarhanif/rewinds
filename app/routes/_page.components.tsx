import { json } from "@remix-run/node";

import {
  Anchor,
  AnchorText,
  Button,
  ButtonAnchor,
  ButtonIcon,
  ButtonLink,
  CopyButton,
  FormInput,
  FormSubmitButton,
  FormTextArea,
  Input,
  Label,
  Layout,
  Logo,
  PageHeader,
  RemixForm,
  RemixLink,
  RemixLinkText,
  RemixValidatedForm,
  TextArea,
  ToastAction,
} from "~/components";
import { useToast } from "~/hooks";
import {
  Calendar,
  CheckCircle,
  EditPencil,
  Loader2,
  Mail,
  Star,
  Trash,
} from "~/icons";
import { createDocumentLinks, createMetaData } from "~/utils";
import { createSitemap } from "~/utils";

import type { LoaderArgs, ActionArgs, LinksFunction } from "@remix-run/node";

export const meta = createMetaData({
  title: "Components",
  description: "Several components already made.",
});

export const handle = createSitemap("/examples", 0.9);

export const links: LinksFunction = () => {
  return createDocumentLinks({ canonicalPath: "/examples" });
};

export async function loader({ request }: LoaderArgs) {
  return json({});
}

export async function action({ request }: ActionArgs) {
  return json({});
}

export default function ComponentsRoute() {
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
      <div className="stack-v">
        <header>
          <h2>UI</h2>
          <p>Basic and primitive UI components.</p>
        </header>
        <ExampleLink />
        <ExampleButton />
        <ExampleButtonIcon />
        <ExampleToast />
      </div>

      <div className="stack-v">
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

      <div className="stack-v">
        <h4>Link</h4>
        <div className="stack-h-center">
          <RemixLink to="/">Link without style</RemixLink>
          <RemixLinkText to="/about">Link text with style</RemixLinkText>
          <ButtonLink size="xs" to="/">
            Button Link
          </ButtonLink>
        </div>
      </div>

      <div className="stack-v">
        <h4>Anchor</h4>
        <div className="stack-h-center">
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

      <div className="stack-v">
        <h4>Variant</h4>
        <div className="stack-h-center">
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

      <div className="stack-v">
        <h4>Size</h4>
        <div className="stack-h-center">
          <Button size="xs">Extra Small</Button>
          <Button size="sm">Small</Button>
          <Button>Default</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>

      <div className="stack-v">
        <h4>With Icon</h4>
        <div className="stack-h-center">
          <Button size="sm">
            <Mail className="size-sm" />
            <span> Login with Email</span>
          </Button>
          <Button size="sm" variant="success">
            <span> Mark as Complete</span>
            <CheckCircle className="size-sm" />
          </Button>
          <Button size="xs" variant="info">
            <EditPencil className="size-xs" />
            <span> Edit</span>
          </Button>
          <Button size="xs" variant="danger">
            <Trash className="size-xs" />
            <span> Delete</span>
          </Button>
          <CopyButton
            variant="ghost"
            size="sm"
            contentToCopy="Content to copy"
            withText
          />
        </div>
      </div>

      <div className="stack-v">
        <h4>With Loading Icon</h4>
        <div className="stack-h-center">
          <Button size="sm" disabled>
            <Loader2 className="size-sm mr-2 animate-spin" />
            <span>Loading...</span>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function ExampleButtonIcon() {
  return (
    <section id="example-button-icon" className="card space-y-8">
      <h3>Button Icon</h3>

      <div className="stack-v">
        <h4>Variant</h4>
        <div className="stack-h-center">
          <ButtonIcon>
            <Star />
          </ButtonIcon>
          <ButtonIcon variant="info">
            <Star />
          </ButtonIcon>
          <ButtonIcon variant="success">
            <Star />
          </ButtonIcon>
          <ButtonIcon variant="warning">
            <Star />
          </ButtonIcon>
          <ButtonIcon variant="danger">
            <Star />
          </ButtonIcon>
          <ButtonIcon variant="subtle">
            <Star />
          </ButtonIcon>
          <ButtonIcon variant="outline">
            <Star />
          </ButtonIcon>
          <ButtonIcon variant="ghost">
            <Star />
          </ButtonIcon>
          <ButtonIcon variant="link">
            <Star />
          </ButtonIcon>
        </div>
      </div>

      <div className="stack-v">
        <h4>Size</h4>
        <div className="stack-h-center">
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
    </section>
  );
}

export function ExampleLogo() {
  return (
    <section id="example-logo" className="card space-y-8">
      <h3>Logo</h3>

      <div className="stack-v">
        <h4>Accent</h4>
        <div className="stack-h-center">
          <Logo />
          <Logo accent="brand" />
        </div>
      </div>

      <div className="stack-v">
        <h4>Size</h4>
        <div className="stack-h-center">
          <Logo size="xs" />
          <Logo size="sm" />
          <Logo />
          <Logo size="lg" />
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

      <div className="stack-v">
        <h4>Variant</h4>
        <div className="stack-h-center">
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

export function ExampleBlank() {
  return (
    <section id="example-blank" className="card space-y-8">
      <h3>Blank</h3>

      <div className="stack-v">
        <h4>Variant</h4>
        <div className="stack-h-center">
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
        <RemixForm method="post" className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="example-email"
              placeholder="name@example.com"
            />
            <p className="text-sm text-surface-500">
              Enter your email address.
            </p>
          </div>

          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="example-password"
              placeholder="********"
            />
            <p className="text-sm text-surface-500">Enter your password.</p>
          </div>

          <div className="space-y-1">
            <Label htmlFor="message">Message</Label>
            <TextArea
              id="example-message"
              placeholder="Type your message here..."
            />
            <p className="text-sm text-surface-500">
              Your message will be sent to our team.
            </p>
          </div>

          <div className="flex gap-2">
            <Button type="submit" className="grow">
              Submit Form
            </Button>
            <Button type="reset" variant="subtle">
              Reset
            </Button>
          </div>
        </RemixForm>

        <RemixValidatedForm
          validator={{} as any}
          method="post"
          className="space-y-4"
        >
          <FormInput
            name="name"
            label="Name"
            helpText="Min. of 3 characters, max. of 30 characters"
            placeholder="First Last"
          />
          <FormTextArea
            name="description"
            label="Description"
            helpText="Min. of 10 characters, max. of 140 characters"
            placeholder="Some long text..."
            rows={12}
          />
          <FormSubmitButton
            loadingChildren={"Submitting..."}
            className="w-full"
          >
            Submit Validated Form
          </FormSubmitButton>
        </RemixValidatedForm>
      </div>
    </section>
  );
}
