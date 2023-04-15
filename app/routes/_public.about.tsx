import {
  Anchor,
  AspectRatio,
  Balancer,
  Image,
  Layout,
  PageProgress,
  YouTubeVideo,
} from "~/components";
import { useRootLoaderData } from "~/hooks";
import { AppleMac } from "~/icons";
import { createMetaData, createSitemap } from "~/utils";

export const meta = createMetaData({
  title: "About",
  description:
    "Just some quick info about this project and showcase some of the features.",
});

export const handle = createSitemap("/about", 0.9);

// TODO: Load content from HTML/MDX data
export default function Route() {
  const { user } = useRootLoaderData();

  return (
    <Layout className="contain-sm space-y-20">
      <article className="prose-config mt-10">
        <h1>
          <Balancer>About the Remix starter kit called Rewinds</Balancer>
        </h1>
        {user && <p>Hello {user.name}.</p>}
        <p>
          This about page is to showcase the prose styles from Tailwind CSS
          Typography. This template is originally made by{" "}
          <Anchor href="https://mhaidarhanif.com">M Haidar Hanif</Anchor> in
          conjunction with <Anchor href="https://catamyst.com">Catamyst</Anchor>{" "}
          and its tech stack for various projects.
        </p>
        <p>
          As informed on the landing page, Rewinds is a Remix Tailwind Stack
          with Tailwind CSS family of libraries, interactive components, and the
          TypeScript ecosystem. Compared to the{" "}
          <Anchor href="https://github.com/mhaidarhanif/rewinds-legacy">
            the older <code>rewinds</code>
          </Anchor>{" "}
          this newer version uses{" "}
          <Anchor href="https://github.com/shadcn/ui">
            <code>shadcn/ui</code>
          </Anchor>{" "}
          as the base components style and setup for full stack app development
          is inspired by <Anchor href="https://create.t3.gg">T3 Stack</Anchor>.
        </p>
        <p>
          This also includes the{" "}
          <Anchor href="https://github.com/remix-run/remix/releases/tag/remix%401.14.0">
            Remix HMR & HDR setup
          </Anchor>{" "}
          with both Vercel config and Express server on development as per Remix{" "}
          <code>v1.14</code>. The config is just combining the templates from
          Remix with Express and Vercel based on the environment.
        </p>
        <figure>
          <Image
            src="https://images.unsplash.com/photo-1532188978303-4bfaccc429d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            alt="Article Illustration"
            width={1470}
            height={980}
            className="rounded"
          />
          <figcaption>Article Illustration</figcaption>
        </figure>
        <h2>Heading Two</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis,
          necessitatibus maxime. Tenetur repudiandae et soluta quas nihil ut
          delectus porro rerum tempora, cumque vero, reprehenderit, fugit
          eligendi minus mollitia sint.
        </p>
        <AspectRatio ratio={16 / 9}>
          <YouTubeVideo title="Example" youtubeEmbedId={"c3uJUrvI2zc"} />
        </AspectRatio>
        <h3>Heading Three</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis,
          necessitatibus maxime. Tenetur repudiandae et soluta quas nihil ut
          delectus porro rerum tempora, cumque vero, reprehenderit, fugit
          eligendi minus mollitia sint.
        </p>
        <h4>Heading Four</h4>
        <p>Here are some foods.</p>
        <ol>
          <li>
            Apple <AppleMac className="inline-icon" /> <span></span>
          </li>
          <li>Banana</li>
          <ul>
            <li>Coconut</li>
            <li>Dragonfruit</li>
          </ul>
          <li>
            Edamame <span>（枝豆）</span>
          </li>
          <li>Fig-ma</li>
          <ul>
            <li>Grape</li>
            <li>Honeydew</li>
          </ul>
          <li>
            Ichigo <span>（いちご）</span>
          </li>
          <li>Jackfruit</li>
        </ol>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis,
          necessitatibus maxime. Tenetur repudiandae et soluta quas nihil ut
          delectus porro rerum tempora, cumque vero, reprehenderit, fugit
          eligendi minus mollitia sint.
        </p>
        <p>Alright, this should be it! Let's use Rewinds.</p>
      </article>

      <PageProgress />
    </Layout>
  );
}
