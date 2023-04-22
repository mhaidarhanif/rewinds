import { parse } from "@conform-to/zod";
import { useActionData, useNavigation } from "@remix-run/react";
import { useState } from "react";
import { badRequest, serverError } from "remix-utils";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";

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
import { createMetaData, jsonStringify } from "~/utils";
import { model } from "~/models";

import type { FileGroup, FileInfo } from "@uploadcare/react-widget";
import { z } from "zod";

/**
 * Demo: Uploadcare
 */

export const meta = createMetaData({
  title: "Demo: Uploadcare",
  description: "Upload files demo.",
});

export const schemaUploadcareDemo = z.object({
  multiple: z.string().optional(),
  // These are texts because they were sent as stringified JSON from the client
  fileInfo: z.string().optional(), // Contain one object
  fileGroup: z.string().optional(), //  Contain array of multiple objects
});

export async function loader({ request }: LoaderArgs) {
  await requireUserSession(request);
  return null;
}

export async function action({ request }: ActionArgs) {
  const { userSession } = await requireUserSession(request);

  const formData = await request.formData();
  const submission = parse(formData, { schema: schemaUploadcareDemo });

  if (!submission.value || submission.intent !== "submit") {
    return badRequest(submission);
  }

  // Transform checkbox value to boolean
  const multiple = submission?.value?.multiple === "on" ? true : false;

  if (!multiple) {
    const fileInfo: FileInfo = JSON.parse(String(submission?.value?.fileInfo));

    try {
      const newImage = await model.userImage.mutation.create({
        image: { url: String(fileInfo.cdnUrl) },
        user: { id: userSession.id },
      });
      if (!newImage) {
        return badRequest(submission);
      }
      return json(submission);
    } catch (error) {
      console.error(error);
      return serverError(submission);
    }
  }

  if (multiple) {
    const fileGroup: FileGroup = JSON.parse(
      String(submission?.value?.fileGroup)
    );
    const fileGroupNumbers = Array.from(Array(fileGroup?.count).keys());

    if (fileGroup?.count <= 0 && fileGroupNumbers?.length <= 0) {
      return badRequest(submission);
    }

    const files: FileInfo[] = fileGroupNumbers.map((number) => {
      return {
        cdnUrl: `${fileGroup?.cdnUrl}nth/${number}/`,
      } as FileInfo;
    });

    try {
      // TODO: Create many images based on files array
      const newImages = files;

      if (!newImages) {
        return badRequest(submission);
      }
      return json(submission);
    } catch (error) {
      console.error(error);
      return serverError(submission);
    }
  }

  return json(submission);
}

export default function Route() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [fileInfo, setFileInfo] = useState<FileInfo>();
  const [fileGroup, setFileGroup] = useState<FileGroup>();
  const [fileGroupNumbers, setFileGroupNumbers] = useState<number[]>();

  // TODO: Use a switch
  const multiple = true;

  // TODO: Use a toast to show the file/files have been saved
  // console.info()

  function handleUploaded(file: any) {
    if (!file?.count) {
      setFileInfo(file as FileInfo);
    }
    if (file?.count) {
      setFileGroup(file as FileGroup);
      setFileGroupNumbers(Array.from(Array(file?.count).keys()));
    }
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
            <Label>Upload image{multiple && "s"}:</Label>
            <UploadcareWidget
              multiple={multiple}
              handleUploaded={handleUploaded}
              isDemo
              isAlwaysShowDebug
            />
            <input
              className="hidden"
              type="checkbox"
              id="multiple"
              name="multiple"
              defaultChecked={multiple}
              readOnly
            />
            <Input
              type="hidden"
              name="fileInfo"
              value={jsonStringify(fileInfo)}
              readOnly
            />
            <Input
              type="hidden"
              name="fileGroup"
              value={jsonStringify(fileGroup)}
              readOnly
            />
          </div>

          <div>
            <Card
              data-id="preview-uploaded-files"
              className="queue-center h-36 w-full px-2"
            >
              {/* If no file/files yet */}
              {!fileInfo && !fileGroup && (
                <div className="cross-center h-[inherit] w-full select-none">
                  <p className="dim">Preview will be shown here</p>
                </div>
              )}

              {/* If one file as a FileInfo */}
              {fileInfo && (
                <Anchor href={String(fileInfo?.cdnUrl)}>
                  <Image
                    src={String(fileInfo?.cdnUrl)}
                    alt={String(fileInfo?.name)}
                    className="max-h-32 max-w-xs object-cover"
                  />
                </Anchor>
              )}

              {/* If multiple files as a FileGroup */}
              {Number(fileGroup?.count) > 0 && (
                <div className="queue-center h-[inherit] w-full">
                  {fileGroupNumbers &&
                    fileGroupNumbers?.length > 0 &&
                    fileGroupNumbers.map((number) => {
                      const cdnUrl = `${fileGroup?.cdnUrl}nth/${number}/`;
                      return (
                        <Anchor key={cdnUrl} href={cdnUrl}>
                          <Image
                            src={cdnUrl}
                            alt={`Uploaded file: ${number}`}
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
            loadingText="Saving..."
            className="grow"
          >
            Save
          </ButtonLoading>
        </RemixForm>

        <Debug name="state,actionData">
          {{
            state: {
              fileInfo,
              fileGroup,
              fileGroupNumbers,
            },
            actionData,
          }}
        </Debug>
      </div>
    </Layout>
  );
}
