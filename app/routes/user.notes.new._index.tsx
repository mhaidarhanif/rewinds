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
  TooltipAuto,
} from "~/components";
import { configDev } from "~/configs";
import { requireUserSession } from "~/helpers";
import { model } from "~/models";
import { schemaNoteNew } from "~/schemas";
import { createSitemap } from "~/utils";

import type { ActionArgs } from "@remix-run/node";
import type { z } from "zod";
import { InfoEmpty, SubmitDocument } from "~/icons";

export const handle = createSitemap();

export async function action({ request }: ActionArgs) {
  const { userSession, user } = await requireUserSession(request);

  const formData = await request.formData();
  const submission = parse(formData, { schema: schemaNoteNew });
  if (!submission.value || submission.intent !== "submit") {
    return badRequest(submission);
  }

  try {
    const newNote = await model.userNote.mutation.create({
      user: userSession,
      note: submission.value,
    });
    if (!newNote) {
      return badRequest(submission);
    }
    return redirect(`/${user.username}/${newNote.slug}`);
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
    <section className="space-y-2">
      <header className="py-4">
        <h1 className="queue-center text-3xl">
          <SubmitDocument />
          <span>Create a new note</span>
          <TooltipAuto
            content={
              <p>
                A note can be a blog post, news article, <br /> tutorial, or
                just a regular note
              </p>
            }
          >
            <InfoEmpty className="size-md" />
          </TooltipAuto>
        </h1>
      </header>

      <RemixForm {...form.props} method="POST">
        <fieldset
          disabled={isSubmitting}
          className="space-y-4 disabled:opacity-80"
        >
          <div className="space-y-1">
            <Label htmlFor={title.id}>Title</Label>
            <Input
              {...conform.input(title)}
              autoFocus
              type="text"
              placeholder="Add a title"
              defaultValue={configDev.isDevelopment ? "A new example" : ""}
              className="border-none px-1 text-lg sm:text-xl md:text-2xl lg:text-3xl"
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
              className="border-none px-1 text-lg sm:text-xl"
            />
            <Alert id={description.errorId}>{description.error}</Alert>
          </div>

          <div className="space-y-1">
            <Label htmlFor={content.id}>Content</Label>
            <TextArea
              {...conform.input(content)}
              placeholder="Type your longer content here, maximum content length of 10,000 characters..."
              rows={20}
              defaultValue={
                configDev.isDevelopment
                  ? "Here is the long content about the note."
                  : ""
              }
              className="border-none px-1 sm:text-lg"
            />
            <Alert id={content.errorId}>{content.error}</Alert>
          </div>

          <div className="queue-center">
            <ButtonLoading
              type="submit"
              name="intent"
              value="submit"
              isSubmitting={isSubmitting}
              loadingText="Creating..."
              className="grow"
            >
              Create
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
    </section>
  );
}
