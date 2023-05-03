import { parse } from "@conform-to/react";
import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { serverError } from "remix-utils";

import {
  Button,
  ButtonLink,
  PageAdminHeader,
  RemixForm,
  RemixLink,
} from "~/components";
import { configDev } from "~/configs";
import { Plus, Trash } from "~/icons";
import { createSitemap, formatPluralItems } from "~/utils";

import type { ActionArgs } from "@remix-run/node";
import { prisma } from "~/libs";

export const handle = createSitemap();

export async function loader() {
  const images = await prisma.image.findMany({
    include: { user: true },
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
    <div>
      <PageAdminHeader size="xs">
        <RemixLink to=".">
          <h1>Images</h1>
        </RemixLink>
        <div className="queue">
          <ButtonLink to="/uploadcare" size="sm">
            <Plus className="size-sm" />
            <span>Add Image</span>
          </ButtonLink>
          {configDev.isDevelopment && (
            <RemixForm method="delete">
              <Button
                size="sm"
                variant="danger"
                name="intent"
                value="delete-all-images"
                disabled={imagesCount <= 0}
              >
                <Trash className="size-sm" />
                <span>
                  Delete All {formatPluralItems("Image", imagesCount)}
                </span>
              </Button>
            </RemixForm>
          )}
        </div>
      </PageAdminHeader>

      <div className="px-layout">
        <Outlet />
      </div>
    </div>
  );
}
