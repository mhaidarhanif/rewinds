import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useEffect, useRef } from "react";

import { Button, Label, TextArea } from "~/components";
import { createNote } from "~/models";
import { requireUserId } from "~/sessions";
import { createSitemap } from "~/utils";

import type { ActionArgs } from "@remix-run/node";

export const handle = createSitemap();

export async function action({ request }: ActionArgs) {
  const userId = await requireUserId(request);

  const formData = await request.formData();
  const title = formData.get("title");
  const content = formData.get("content");

  if (typeof title !== "string" || title.length === 0) {
    return json(
      { errors: { title: "Title is required", content: null } },
      { status: 400 }
    );
  }

  if (typeof content !== "string" || content.length === 0) {
    return json(
      { errors: { title: null, content: "Content is required" } },
      { status: 400 }
    );
  }

  const note = await createNote({
    slug: "",
    title,
    description: "",
    content,
    userId,
  });

  return redirect(`/notes/${note.id}`);
}

export default function NewNoteRoute() {
  const actionData = useActionData<typeof action>();
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (actionData?.errors?.title) {
      titleRef.current?.focus();
    } else if (actionData?.errors?.content) {
      bodyRef.current?.focus();
    }
  }, [actionData]);

  return (
    <Form method="post">
      <div>
        <Label>
          <span>Title: </span>
          <input
            ref={titleRef}
            name="title"
            aria-invalid={actionData?.errors?.title ? true : undefined}
            aria-errormessage={
              actionData?.errors?.title ? "title-error" : undefined
            }
          />
        </Label>
        {actionData?.errors?.title && (
          <div id="title-error">{actionData.errors.title}</div>
        )}
      </div>

      <div>
        <Label>
          <span>Body: </span>
          <TextArea
            ref={bodyRef}
            name="body"
            rows={8}
            aria-invalid={actionData?.errors?.content ? true : undefined}
            aria-errormessage={
              actionData?.errors?.content ? "body-error" : undefined
            }
          />
        </Label>
        {actionData?.errors?.content && (
          <div id="body-error">{actionData.errors.content}</div>
        )}
      </div>

      <div>
        <Button type="submit">Save</Button>
      </div>
    </Form>
  );
}
