import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Anchor, Image, Debug, RemixLink } from "~/components";
import { createSitemap } from "~/utils";
import { prisma } from "~/libs";

export const handle = createSitemap();

export async function loader() {
  const images = await prisma.image.findMany({
    include: { user: true },
  });
  return json({ images });
}

export default function Route() {
  const { images } = useLoaderData<typeof loader>();
  const imagesCount = images.length;

  return (
    <div className="stack">
      <section>
        {imagesCount <= 0 && <span>No images yet.</span>}
        {imagesCount > 0 && (
          <ul className="queue-center">
            {images
              .filter((image) => image.url && image.url !== "undefined")
              .map((image) => {
                const imageUrl =
                  image.url +
                  `-/preview/200x200/` +
                  `-/format/auto/` +
                  `-/quality/smart/`;

                return (
                  <li key={image.id} className="card stack">
                    <Anchor href={imageUrl}>
                      <Image
                        src={imageUrl}
                        alt={`Image: ${image.url}`}
                        className="max-h-20 max-w-xs object-cover"
                      />
                    </Anchor>
                    {image.user && (
                      <p>
                        by{" "}
                        <RemixLink
                          to={`/admin/users/${image.user.id}`}
                          className="link"
                        >
                          @{image.user.username}
                        </RemixLink>
                      </p>
                    )}
                  </li>
                );
              })}
          </ul>
        )}
      </section>

      <Debug name="images">{images}</Debug>
    </div>
  );
}
