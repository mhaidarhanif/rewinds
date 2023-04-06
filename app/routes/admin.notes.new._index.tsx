import { conform, useForm } from "@conform-to/react";
import { getFieldsetConstraint, parse } from "@conform-to/zod";
import { redirect } from "@remix-run/node";
import { useActionData, useNavigation } from "@remix-run/react";
import { useId } from "react";
import { badRequest, serverError } from "remix-utils";

import {
  Alert,
  Button,
  ButtonLink,
  ButtonLoading,
  Input,
  Label,
  RemixForm,
  TextArea,
} from "~/components";
import { configDev } from "~/configs";
import { requireUserSession } from "~/helpers";
import { model } from "~/models";
import { schemaNoteNew } from "~/schemas";
import { createSitemap } from "~/utils";

import type { ActionArgs } from "@remix-run/node";
import type { z } from "zod";

export const handle = createSitemap();

export async function action({ request }: ActionArgs) {
  const { userSession } = await requireUserSession(request);

  const formData = await request.formData();
  const submission = parse(formData, { schema: schemaNoteNew });
  if (!submission.value || submission.intent !== "submit") {
    return badRequest(submission);
  }

  try {
    const newNote = await model.adminNote.mutation.create({
      user: userSession,
      note: submission.value,
    });
    if (!newNote) {
      return badRequest(submission);
    }
    return redirect(`../${newNote.id}`);
  } catch (error) {
    console.error(error);
    return serverError(submission);
  }
}

export default function Route() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const id = useId();
  const [form, { title, description, content }] = useForm<
    z.infer<typeof schemaNoteNew>
  >({
    id,
    shouldValidate: "onSubmit",
    lastSubmission: actionData,
    onValidate({ formData }) {
      return parse(formData, { schema: schemaNoteNew });
    },
    constraint: getFieldsetConstraint(schemaNoteNew),
  });

  return (
    <div className="stack">
      <header>
        <span>Add New Note</span>
      </header>

      <RemixForm
        {...form.props}
        method="POST"
        className="card max-w-lg space-y-4"
      >
        <fieldset
          disabled={isSubmitting}
          className="space-y-2 disabled:opacity-80"
        >
          <header>
            <div className="space-y-1">
              <Label htmlFor={title.id}>Title</Label>
              <Input
                {...conform.input(title)}
                type="text"
                placeholder="Add a title"
                defaultValue={configDev.isDevelopment ? "A new example" : ""}
                autoFocus
              />
              <Alert id={title.errorId}>{title.error}</Alert>
            </div>

            <div className="space-y-1">
              <Label htmlFor={description.id}>Description</Label>
              <Input
                {...conform.input(description)}
                type="text"
                placeholder="Add a description"
                defaultValue={configDev.isDevelopment ? "The description" : ""}
              />
              <Alert id={description.errorId}>{description.error}</Alert>
            </div>
          </header>

          <div className="space-y-1">
            <Label htmlFor={content.id}>Content</Label>
            <TextArea
              {...conform.input(content)}
              placeholder="Type your longer content here..."
              rows={10}
              defaultValue={
                configDev.isDevelopment
                  ? "Here is the long content about the note."
                  : ""
              }
            />
            <Alert id={content.errorId}>{content.error}</Alert>
            <p className="text-sm text-surface-500">
              The note has a maximum content length of 10,000 characters.
            </p>
          </div>

          <div className="queue-center">
            <ButtonLoading
              type="submit"
              name="intent"
              value="submit"
              isSubmitting={isSubmitting}
              loadingText="Saving..."
              className="grow"
            >
              Save
            </ButtonLoading>
            <Button type="reset" variant="subtle">
              Reset
            </Button>
            <ButtonLink to=".." variant="ghost" accent="red">
              Cancel
            </ButtonLink>
          </div>
        </fieldset>
      </RemixForm>
    </div>
  );
}
