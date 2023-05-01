import type { ActionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import {
  Alert,
  Anchor,
  Image,
  Debug,
  RemixLink,
  RemixForm,
  Button,
} from "~/components";
import { createSitemap, formatPluralItems } from "~/utils";
import { prisma } from "~/libs";
import { Trash } from "~/icons";
import { parse } from "@conform-to/dom";
import { serverError } from "remix-utils";

export const handle = createSitemap();

export async function loader() {
  const images = await prisma.image.findMany({
    include: {
      user: true,
    },
  });
  return json({ images });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const submission = parse(formData);

  try {
    if (submission.payload.intent === "delete-all-images") {
      await prisma.image.deleteMany();
      return json(submission);
    }
  } catch (error) {
    console.error(error);
    return serverError(submission);
  }

  return json(submission);
}

export default function Route() {
  const { images } = useLoaderData<typeof loader>();
  const imagesCount = images.length;

  return (
    <div className="stack px-layout">
      <Alert variant="warning">Under development</Alert>

      <header className="queue-center">
        <span>All Images</span>
        <RemixForm method="delete">
          <Button
            size="xs"
            variant="danger"
            name="intent"
            value="delete-all-images"
            disabled={imagesCount <= 0}
          >
            <Trash className="size-xs" />
            <span>Delete All {formatPluralItems("Image", imagesCount)}</span>
          </Button>
        </RemixForm>
      </header>

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
