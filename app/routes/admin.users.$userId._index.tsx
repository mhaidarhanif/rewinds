import { parse } from "@conform-to/react";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { serverError } from "remix-utils";

import {
  AvatarAuto,
  Badge,
  Button,
  ButtonLink,
  Debug,
  RemixForm,
  RemixLink,
  TooltipAuto,
} from "~/components";
import { requireUserRole, requireUserSession } from "~/helpers";
import { EditPencil, Eye, Trash } from "~/icons";
import { model } from "~/models";
import {
  createSitemap,
  formatDateTime,
  formatRelativeTime,
  invariant,
} from "~/utils";

import type { ActionArgs, LoaderArgs } from "@remix-run/node";

export const handle = createSitemap();

export async function loader({ request, params }: LoaderArgs) {
  invariant(params.userId, "userId not found");
  const { user: userData } = await requireUserSession(request);
  const isActionAllowed = requireUserRole(userData, ["ADMIN", "MANAGER"]);

  const user = await model.adminUser.query.getById({ id: params.userId });
  return json({ user, isActionAllowed });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const submission = parse(formData);

  if (submission.payload.intent === "delete-user") {
    try {
      await model.adminUser.mutation.deleteById({
        id: submission.payload.userId,
      });
      return redirect(`..`);
    } catch (error) {
      console.error(error);
      return serverError(submission);
    }
  }
}

export default function Route() {
  const { user, isActionAllowed } = useLoaderData<typeof loader>();

  if (!user) {
    return <span>User not found.</span>;
  }

  return (
    <div className="stack">
      <header>
        <div className="queue-center">
          <span>View User</span>

          <ButtonLink to={`/${user.username}`} size="xs" variant="info">
            <Eye className="size-xs" />
            <span>View on Site</span>
          </ButtonLink>

          {isActionAllowed && (
            <>
              <ButtonLink to="edit" size="xs" variant="warning">
                <EditPencil className="size-xs" />
                <span>Edit</span>
              </ButtonLink>

              <RemixForm method="delete">
                <input type="hidden" name="userId" value={user.id} />
                <Button
                  size="xs"
                  variant="danger"
                  name="intent"
                  value="delete-user"
                >
                  <Trash className="size-xs" />
                  <span>Delete</span>
                </Button>
              </RemixForm>
            </>
          )}
        </div>
      </header>

      <section className="card space-y-4">
        <header>
          <div className="queue-center text-xs">
            <span>
              ID: <code>{user.id}</code>
            </span>
            <span>•</span>
            <span>
              Role: <Badge>{user.role.name}</Badge>
            </span>
          </div>

          <div className="queue-center text-xs">
            <TooltipAuto content={<b>{formatDateTime(user.createdAt)}</b>}>
              <span>Created at: </span>
              <b>{formatRelativeTime(user.createdAt)}</b>
            </TooltipAuto>
            <span>•</span>
            <TooltipAuto content={<b>{formatDateTime(user.updatedAt)}</b>}>
              <span>Updated at: </span>
              <b>{formatRelativeTime(user.updatedAt)}</b>
            </TooltipAuto>
          </div>
        </header>

        <section className="queue-center">
          <AvatarAuto user={user} className="size-3xl" />
          <div>
            <h2>
              {user.name} (@{user.username})
            </h2>
            <h3>{user.email}</h3>
          </div>
        </section>

        <article>
          <h4>{user.profile.headline}</h4>
          <p>{user.profile.bio}</p>
        </article>
      </section>

      <section>
        <h5>Notes</h5>
        {user.notes.length <= 0 && <span>No notes yet.</span>}
        {user.notes.length > 0 && (
          <ul className="space-y-1">
            {user.notes.map((note) => {
              return (
                <li key={note.id}>
                  <RemixLink
                    prefetch="intent"
                    to={`/admin/notes/${note.id}`}
                    className="card-sm hover:card-hover"
                  >
                    {note.title}
                  </RemixLink>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <Debug name="user">{user}</Debug>
    </div>
  );
}
