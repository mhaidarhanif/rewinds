import { parse } from "@conform-to/react";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { badRequest } from "remix-utils";

import {
  Button,
  ButtonLink,
  Debug,
  RemixForm,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components";
import { EditPencil, Trash } from "~/icons";
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

          <ButtonLink to="edit" size="xs" variant="info">
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
          <div
            data-id="user-view-id-slug"
            className="flex flex-wrap gap-2 text-xs"
          >
            <p>
              ID: <b>{user.id}</b>
            </p>
          </div>

          <TooltipProvider>
            <div className="flex flex-wrap gap-2 text-xs">
              <Tooltip>
                <TooltipTrigger>
                  <p>
                    <span>Created: </span>
                    <b>{formatRelativeTime(user.createdAt)}</b>
                  </p>
                </TooltipTrigger>
                <TooltipContent>
                  <b>{formatDateTime(user.createdAt)}</b>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <p>
                    <span>Updated: </span>
                    <b>{formatRelativeTime(user.updatedAt)}</b>
                  </p>
                </TooltipTrigger>
                <TooltipContent>
                  <b>{formatDateTime(user.createdAt)}</b>
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
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

      <Debug name="user">{user}</Debug>
    </div>
  );
}
