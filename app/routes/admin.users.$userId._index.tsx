import { parse } from "@conform-to/react";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { badRequest } from "remix-utils";

import {
  Button,
  ButtonLink,
  Debug,
  RemixForm,
  RemixLink,
  TooltipAuto,
} from "~/components";
import { EditPencil, Eye, Trash } from "~/icons";
import { model } from "~/models";
import {
  createCacheHeaders,
  createSitemap,
  formatDateTime,
  formatRelativeTime,
  invariant,
} from "~/utils";

import type { ActionArgs, LoaderArgs } from "@remix-run/node";

export const handle = createSitemap();

export async function loader({ request, params }: LoaderArgs) {
  invariant(params.userId, "userId does not exist");
  const user = await model.adminUser.query.getById({ id: params.userId });
  return json({ user, headers: createCacheHeaders(request) });
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
      return badRequest(submission);
    }
  }
}

export default function AdminUsersViewRoute() {
  const { user } = useLoaderData<typeof loader>();

  if (!user) {
    return <p>User does not exist.</p>;
  }

  return (
    <div data-id="admin-users-view" className="stack-v">
      <header>
        <div className="stack-h-center">
          <span>View User</span>

          <ButtonLink to={`/${user.username}`} size="xs" variant="info">
            <Eye className="size-xs" />
            <span>View on Site</span>
          </ButtonLink>

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
        </div>
      </header>

      <section className="card stack-v">
        <header>
          <div data-id="user-view-id-slug" className="stack-h-center text-xs">
            <p>
              ID: <b>{user.id}</b>
            </p>
          </div>

          <div className="stack-h-center text-xs">
            <TooltipAuto content={<b>{formatDateTime(user.createdAt)}</b>}>
              <span>Created at: </span>
              <b>{formatRelativeTime(user.createdAt)}</b>
            </TooltipAuto>
            <span>·</span>
            <TooltipAuto content={<b>{formatDateTime(user.updatedAt)}</b>}>
              <span>Updated at: </span>
              <b>{formatRelativeTime(user.updatedAt)}</b>
            </TooltipAuto>
          </div>
        </header>

        <section>
          <h2>
            {user.name} (@{user.username})
          </h2>
          <h3>{user.email}</h3>
        </section>

        <article>
          <h4>{user.profile.headline}</h4>
          <p>{user.profile.bio}</p>
        </article>
      </section>

      <section>
        <h5>Notes</h5>
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
      </section>

      <Debug name="user">{user}</Debug>
    </div>
  );
}
