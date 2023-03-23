import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import {
  Button,
  ButtonLink,
  RemixForm,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components";
import { EditPencil, Trash } from "~/icons";
import { model } from "~/models";
import {
  createSitemap,
  formatDateTime,
  formatRelativeTime,
  invariant,
} from "~/utils";

import type { LoaderArgs } from "@remix-run/node";
import type { ActionArgs } from "@remix-run/node";

export const handle = createSitemap();

export async function loader({ params }: LoaderArgs) {
  invariant(params.userId, "userId does not exist");
  const user = await model.adminUser.query.getById({ id: params.userId });
  return json({ user });
}

export async function action({ request }: ActionArgs) {
  return redirect(`..`);
}

// Similar with "admin-users-edit"
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

        {/* <div className="prose-config sm:prose-xl sm:py-4">{user.profile.story}</div> */}
      </section>

      {/* <Debug name="user">{user}</Debug> */}
    </div>
  );
}
