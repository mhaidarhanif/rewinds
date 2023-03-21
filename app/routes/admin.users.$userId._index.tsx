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
import { adminUser } from "~/models";
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
  const { userId } = params;
  invariant(userId, "userId doesn not exist");

  const user = await adminUser.getUser({ id: userId });
  return json({ user });
}

export async function action({ request }: ActionArgs) {
  return redirect(`/admin/users`);
}

// Similar with "admin-users-edit"
export default function AdminUsersViewRoute() {
  const { user } = useLoaderData<typeof loader>();

  if (!user) {
    return <p>User doesn not exist.</p>;
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
            className="flex flex-wrap gap-2 text-xs opacity-50"
          >
            <p>
              ID: <b>{user.id}</b>
            </p>
          </div>

          <TooltipProvider>
            <div className="flex flex-wrap gap-2 text-xs opacity-50">
              <Tooltip>
                <TooltipTrigger>
                  <p>
                    <span>Created </span>
                    <b>{formatRelativeTime(user.createdAt)} </b>
                  </p>
                </TooltipTrigger>
                <TooltipContent>
                  <b>{formatDateTime(user.createdAt)}</b>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <p>
                    <span>Updated </span>
                    <b>{formatRelativeTime(user.updatedAt)} </b>
                  </p>
                </TooltipTrigger>
                <TooltipContent>
                  <b>{formatDateTime(user.createdAt)}</b>
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </header>

        <h2>{user.name}</h2>

        <h3>
          <b>@{user.username}</b>
        </h3>

        <h4>{user.profile.headline}</h4>

        <p>{user.profile.bio}</p>

        {/* <div className="prose-config sm:prose-xl sm:py-4">{user.profile.story}</div> */}
      </section>

      {/* <Debug name="user">{user}</Debug> */}
    </div>
  );
}
