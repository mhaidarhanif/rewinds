import {
  AnchorText,
  ButtonAnchor,
  ButtonLink,
  LandingImage,
  Layout,
} from "~/components";
import { configSite } from "~/configs";
import { useRootLoaderData } from "~/hooks";
import { CompactDisc, Components, Github, Packages, PeaceHand } from "~/icons";
import { createSitemap } from "~/utils";

export const handle = createSitemap("/", 1);

export default function Route() {
  const { user } = useRootLoaderData();

  return (
    <Layout>
      <section className="mx-auto flex max-w-max flex-wrap items-center justify-center gap-4 py-10 lg:justify-between lg:py-20">
        <div className="max-w-lg space-y-4">
          <div className="prose-config">
            <h1 className="text-xl">
              <span>Rewinds, </span>
              <br className="block sm:hidden" />
              <span>a Remix Stack</span>
            </h1>
            <p>
              <PeaceHand className="inline-icon link" />
              {user ? <span>Hey {user.name}, </span> : <span>Hey, </span>}
              <span>it's just another web app starter kit made by </span>
              <AnchorText
                href="https://mhaidarhanif.com"
                className="inline-block"
              >
                M Haidar Hanif
              </AnchorText>
              <span> that also has real world functionalities.</span>
            </p>
            <p>
              <CompactDisc className="inline-icon link" /> Rewinds is a Remix
              Tailwind Stack with Tailwind CSS family of libraries, React
              components, along with the JavaScript, TypeScript, and Node.js
              ecosystem.
            </p>
            <p>
              <Packages className="inline-icon link" /> Including other tech
              stack such as mostly React, Radix UI, Prisma ORM, PlanetScale,
              Vercel, and more.
            </p>
          </div>
          <div className="queue">
            <ButtonLink to="/components" size="lg">
              <Components />
              <span>Components</span>
            </ButtonLink>
            <ButtonAnchor
              href={configSite?.links.github}
              size="lg"
              variant="outline"
            >
              <Github />
              <span>GitHub</span>
            </ButtonAnchor>
          </div>
        </div>

        <aside>
          <LandingImage />
        </aside>
      </section>
    </Layout>
  );
}
