import {
  AnchorText,
  ItemActionContextMenuDemo,
  Layout,
  MusicPlayerDemo,
  PageHeader,
} from "~/components";
import { createDocumentLinks, createMetaData, createSitemap } from "~/utils";

import type { LinksFunction } from "@remix-run/node";

export const meta = createMetaData({
  title: "Demo",
  description: "Complex demo to showcase the components usage.",
});

export const handle = createSitemap("/demo", 0.9);

export const links: LinksFunction = () => {
  return createDocumentLinks({ canonicalPath: "/examples" });
};

export default function DemoRoute() {
  return (
    <Layout
      isSpaced
      layoutHeader={
        <PageHeader>
          <h1>Demo</h1>
          <p>Complex showcase, more than just component examples.</p>
        </PageHeader>
      }
    >
      <DemoMusicPlayer />
      <DemoContextMenu />
    </Layout>
  );
}

export function DemoMusicPlayer() {
  return (
    <section
      id="demo-music-player"
      data-id="DemoMusicPlayer"
      className="space-y-4"
    >
      <header>
        <h2>Music Player</h2>
        <p>
          Demo from{" "}
          <AnchorText href="https://ui.shadcn.com">shadcn/ui</AnchorText>{" "}
          landing page. Just beware, this example wouldn't work on mobile yet.
        </p>
      </header>
      <MusicPlayerDemo />
    </section>
  );
}

export function DemoContextMenu() {
  return (
    <section
      id="demo-context-menu"
      data-id="DemoContextMenu"
      className="card space-y-8"
    >
      <h3>Context Menu</h3>

      <div className="stack-v">
        <h4>Demo</h4>
        <div className="stack-h-center">
          <ItemActionContextMenuDemo />
        </div>
      </div>
    </section>
  );
}
