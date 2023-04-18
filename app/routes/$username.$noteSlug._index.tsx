import { parse } from "@conform-to/react";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { notFound, serverError } from "remix-utils";

import {
  AvatarAuto,
  Balancer,
  Button,
  ButtonLink,
  Layout,
  RemixForm,
  RemixLink,
  TooltipAuto,
} from "~/components";
import { requireUserSession } from "~/helpers";
import { useRootLoaderData } from "~/hooks";
import { EditPencil, Trash } from "~/icons";
import { model } from "~/models";
import {
  createCacheHeaders,
  createMetaData,
  createSitemap,
  formatDateTime,
  formatRelativeTime,
  invariant,
} from "~/utils";

import type { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";

export const handle = createSitemap();

export const meta: V2_MetaFunction<typeof loader> = ({ params, data }) => {
  const note = data?.note;

  if (!note) {
    return createMetaData({
      title: "Note does not exist",
      description: `Cannot find note ${params.noteSlug} from ${params.username}`,
    });
  }

  return createMetaData({
    title: `${note.title}`,
    description: `${note.description} by ${note.user.name} (@${note.user.username})`,
  });
};

export async function loader({ request, params }: LoaderArgs) {
  invariant(params.noteSlug, `noteSlug not found`);
  invariant(params.username, `username not found`);

  // Check 2 things because we won't allow the correct note slug
  // but with the wrong user
  const note = await model.note.query.getBySlugAndUsername({
    slug: params.noteSlug,
    username: params.username,
  });
  if (!note) {
    throw notFound("Note not found");
  }

  // TODO: Don't use cache if coming from edit
  return json({ note }, { headers: createCacheHeaders(request, 1) });
}

export async function action({ request }: ActionArgs) {
  const { userSession, user } = await requireUserSession(request);

  const formData = await request.formData();
  const submission = parse(formData);

  if (submission.payload.intent === "delete-note") {
    try {
      await model.userNote.mutation.deleteById({
        id: submission.payload.noteId,
        userId: userSession.id,
      });
      return redirect(`/${user.username}`);
    } catch (error) {
      console.error(error);
      return serverError(submission);
    }
  }
}

/**
 * Similar with /notes/$noteSlug but fancier
 */
export default function Route() {
  const { user: userSession } = useRootLoaderData();
  const { note } = useLoaderData<typeof loader>();

  const isOwner = userSession?.id === note.userId;

  // TODO: Can have custom background cover like on dev.to
  return (
    <Layout
      isSpaced
      variant="sm"
      layoutHeader={
        <header className="mb-4 space-y-4 bg-surface-100 py-6 dark:bg-surface-800/20 sm:py-10">
          {isOwner && (
            <aside className="contain-sm queue-center">
              <ButtonLink
                to={`/user/notes/${note.id}/edit`}
                size="xs"
                variant="warning"
              >
                <EditPencil className="size-xs" />
                <span>Edit</span>
              </ButtonLink>
              <RemixForm method="delete">
                <input type="hidden" name="noteId" value={note.id} />
                <Button
                  size="xs"
                  variant="danger"
                  name="intent"
                  value="delete-note"
                >
                  <Trash className="size-xs" />
                  <span>Delete</span>
                </Button>
              </RemixForm>
            </aside>
          )}

          <div className="contain-sm space-y-4">
            <h1>
              <Balancer>{note.title}</Balancer>
            </h1>
            <h2>{note.description}</h2>
          </div>
        </header>
      }
    >
      <aside className="flex items-center gap-2">
        <RemixLink to={`/${note.user.username}`}>
          <AvatarAuto user={note.user} className="size-2xl" />
        </RemixLink>
        <div>
          <h4>
            <RemixLink to={`/${note.user.username}`} className="hover:link">
              {note.user.name} (@{note.user.username})
            </RemixLink>
          </h4>
          <div className="queue-sm text-xs sm:text-sm">
            <TooltipAuto content={<b>{formatDateTime(note.createdAt)}</b>}>
              <span>Posted </span>
              <b>{formatRelativeTime(note.createdAt)}</b>
            </TooltipAuto>
            <span>•</span>
            <TooltipAuto content={<b>{formatDateTime(note.updatedAt)}</b>}>
              <span>Updated </span>
              <b>{formatRelativeTime(note.updatedAt)}</b>
            </TooltipAuto>
          </div>
        </div>
      </aside>

      <article className="prose-config whitespace-pre-wrap sm:py-4">
        {note.content}
      </article>
    </Layout>
  );
}
