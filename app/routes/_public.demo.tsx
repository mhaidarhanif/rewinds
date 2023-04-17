import {
  AnchorText,
  ItemActionContextMenuDemo,
  Layout,
  MusicPlayerDemo,
  PageHeader,
  PageProgress,
} from "~/components";
import { createMetaData, createSitemap } from "~/utils";

export const meta = createMetaData({
  title: "Demo",
  description: "Complex demo to showcase the components usage.",
});

export const handle = createSitemap("/demo", 0.9);

export default function Route() {
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
      <DemoPageProgress />
    </Layout>
  );
}

export function DemoMusicPlayer() {
  return (
    <section id="demo-music-player" className="space-y-4">
      <header>
        <h2>Music Player</h2>
        <p>
          Demo from{" "}
          <AnchorText href="https://ui.shadcn.com">shadcn/ui</AnchorText>{" "}
          landing page. Just beware, this example wouldn't work and show on
          mobile yet.
        </p>
      </header>

      <div className="hidden lg:block">
        <MusicPlayerDemo />
      </div>

      <div className="lg:hidden">
        <p className="card">
          Music Player is only available on at least large size screens.
        </p>
      </div>
    </section>
  );
}

export function DemoContextMenu() {
  return (
    <section id="demo-context-menu" className="card space-y-8">
      <h3>Context Menu</h3>

      <div className="stack">
        <h4>Demo</h4>
        <div className="queue-center">
          <ItemActionContextMenuDemo />
        </div>
      </div>
    </section>
  );
}

export function DemoPageProgress() {
  return (
    <section id="demo-page-progress" className="card space-y-8">
      <h3>Page Progress</h3>

      <div className="stack">
        <PageProgress progressValue={50} />
        <PageProgress progressValue={75} isAnimated />
      </div>
    </section>
  );
}
