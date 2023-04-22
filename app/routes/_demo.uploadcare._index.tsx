import { parse } from "@conform-to/zod";
import { useActionData, useNavigation } from "@remix-run/react";
import { useState } from "react";
import { badRequest, serverError } from "remix-utils";

import {
  ButtonLoading,
  Card,
  Debug,
  Input,
  Label,
  Layout,
  PageHeader,
  RemixForm,
  UploadcareWidget,
  Image,
  Anchor,
} from "~/components";
import { requireUserSession } from "~/helpers";
import { useRootLoaderData } from "~/hooks";

import type { ActionArgs } from "@remix-run/node";
import type { FileInfo } from "@uploadcare/react-widget";
import { jsonParse, jsonStringify } from "~/utils";
import { z } from "zod";
import { model } from "~/models";

/**
 * Demo: Uploadcare
 */

export const schemaDemoUploadcare = z.object({
  imageUrl: z.string().optional(),
  uploadedFiles: z.string().optional(), // Contain array of objects
});

export async function action({ request }: ActionArgs) {
  const { userSession } = await requireUserSession(request);

  const formData = await request.formData();
  const submission = parse(formData, { schema: schemaDemoUploadcare });
  if (!submission.value || submission.intent !== "submit") {
    return badRequest(submission);
  }
  const uploadedFields = jsonParse(submission.value.uploadedFiles);
  console.info({ uploadedFields });

  try {
    const newImage = await model.userImage.mutation.create({
      image: {
        url: submission?.value?.imageUrl || "https://example.com",
      },
      user: {
        id: userSession.id,
      },
    });
    if (!newImage) {
      return badRequest(submission);
    }
    return null;
  } catch (error) {
    console.error(error);
    return serverError(submission);
  }
}

export default function Route() {
  const { ENV } = useRootLoaderData();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [uploadedFiles, setUploadedFiles] = useState<FileInfo[]>([]);

  if (!ENV.UPLOADCARE_PUBLIC_KEY) {
    return null;
  }

  function getUploadedFile(file: FileInfo) {
    setUploadedFiles([...uploadedFiles, file]);
  }

  return (
    <Layout
      isSpaced
      layoutHeader={
        <PageHeader size="sm" isTextCentered>
          <h1>Demo: Uploadcare</h1>
        </PageHeader>
      }
    >
      <div className="mx-auto w-full max-w-xl">
        <RemixForm method="POST" className="stack">
          <div className="stack">
            <Label>Upload image:</Label>
            <UploadcareWidget
              getUploadedFile={getUploadedFile}
              // publicKey="demopublickey" // Toggle this to save to storage
            />
            <Input
              type="hidden"
              name="imageUrl"
              value={String(uploadedFiles[0]?.cdnUrl)}
              readOnly
            />
            <Input
              type="hidden"
              name="uploadedFiles"
              value={jsonStringify(uploadedFiles)}
              readOnly
            />
          </div>

          <div>
            <Card
              data-id="preview-uploaded-files"
              className="flex h-36 w-full px-2"
            >
              {uploadedFiles.length <= 0 && (
                <div className="cross-center h-[inherit] w-full select-none">
                  <p className="dim">Preview will be shown here</p>
                </div>
              )}
              {uploadedFiles.length > 0 && (
                <div className="queue-center h-[inherit] w-full">
                  {uploadedFiles.map(({ uuid, cdnUrl, name }) => {
                    return (
                      <Anchor key={uuid} href={String(cdnUrl)}>
                        <Image
                          src={String(cdnUrl)}
                          alt={String(name)}
                          className="max-h-32 max-w-xs object-cover"
                        />
                      </Anchor>
                    );
                  })}
                </div>
              )}
            </Card>
          </div>

          <ButtonLoading
            type="submit"
            name="intent"
            value="submit"
            isSubmitting={isSubmitting}
            loadingText="Submitting..."
            className="grow"
          >
            Submit
          </ButtonLoading>
        </RemixForm>

        <Debug name="actionData">{actionData}</Debug>
      </div>
    </Layout>
  );
}
