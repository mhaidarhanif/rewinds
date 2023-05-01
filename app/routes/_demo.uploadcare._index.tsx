import { useState, useEffect } from "react";
import { json } from "@remix-run/node";
import { useActionData, useNavigation } from "@remix-run/react";
import { badRequest, serverError } from "remix-utils";
import { parse } from "@conform-to/zod";
import { z } from "zod";

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
  Switch,
} from "~/components";
import { requireUserSession } from "~/helpers";
import { model } from "~/models";
import { createMetaData, jsonStringify } from "~/utils";

import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import type { FileGroup, FileInfo } from "@uploadcare/react-widget";
import { toast } from "~/hooks";

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

  try {
    // Transform checkbox "on" or null value to boolean
    const multiple = submission?.value?.multiple === "on" ? true : false;

    // If not multiple, save one file info to database (Image table)
    if (!multiple && submission?.value?.fileInfo) {
      const fileInfo: FileInfo = JSON.parse(
        String(submission?.value?.fileInfo)
      );

      const newImage = await model.userImage.mutation.create({
        image: { url: String(fileInfo.cdnUrl) },
        user: { id: userSession.id },
      });
      if (!newImage) {
        return badRequest(submission);
      }
      return json({ ...submission, newImage });
    }

    // If multiple, save multiple files info to database (Image table)
    if (multiple && submission?.value?.fileGroup) {
      const fileGroup: FileGroup = JSON.parse(
        String(submission?.value?.fileGroup)
      );
      const fileGroupNumbers = Array.from(Array(fileGroup?.count).keys());

      if (fileGroup?.count <= 0 && fileGroupNumbers?.length <= 0) {
        return badRequest(submission);
      }

      const newImages = await model.userImage.mutation.createMany({
        files: fileGroupNumbers.map((number) => {
          return {
            cdnUrl: `${fileGroup?.cdnUrl}nth/${number}/`,
          } as FileInfo;
        }),
        user: {
          id: userSession.id,
        },
      });
      if (!newImages) {
        return badRequest(submission);
      }
      return json({ ...submission, newImages });
    }
  } catch (error) {
    console.error(error);
    return serverError(submission);
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

  const [isMultiple, setIsMultiple] = useState<boolean>(true);

  const isSubmitEnabled =
    (!isMultiple && fileInfo?.cdnUrl) || (isMultiple && fileGroup?.cdnUrl);

  // Keep in mind changing between multiple and not
  // after uploaded some file(s) could cause the expected behaviors
  // for the Uploadcare error:
  // - FileInfo to FileGroup: Can’t create file group
  // - FileGroup to FileInfo: Incorrect value
  function handleChangeMultiple() {
    setIsMultiple(!isMultiple);
  }

  function handleUploaded(file: any) {
    if (!file?.count && !isMultiple) {
      setFileInfo(file as FileInfo);
    }
    if (file?.count && isMultiple) {
      setFileGroup(file as FileGroup);
      setFileGroupNumbers(Array.from(Array(file?.count).keys()));
    }
  }

  // TODO: Use cookie https://jacobparis.com/guides/remix-form-toast
  useEffect(() => {
    if (actionData?.intent === "submit") {
      const mode = isMultiple ? "Multiple files" : "Single file";
      toast({
        variant: "success",
        title: `${mode} uploaded and submitted!`,
      });
    }
  }, [actionData, isMultiple]);

  return (
    <Layout
      isSpaced
      layoutHeader={
        <PageHeader size="sm" isTextCentered>
          <h1>Demo: Uploadcare</h1>
        </PageHeader>
      }
    >
      <div className="stack-lg mx-auto w-full max-w-xl">
        <section className="queue-center">
          <Switch
            id="uploadcare-multiple"
            onCheckedChange={handleChangeMultiple}
            checked={isMultiple}
          />
          <Label htmlFor="uploadcare-multiple">
            {isMultiple ? "Multiple Upload" : "Single Upload"}
          </Label>
        </section>

        <RemixForm method="POST" className="stack">
          <div className="stack">
            <Label>Upload image{isMultiple && "s"}:</Label>
            <UploadcareWidget
              multiple={isMultiple}
              handleUploaded={handleUploaded}
              isDemo
              isAlwaysShowDebug
            />
            <input
              className="hidden"
              type="checkbox"
              id="multiple"
              name="multiple"
              readOnly
              // checked, not defaultChecked because dynamic value
              checked={isMultiple}
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
              className="queue-center min-h-[10rem] w-full p-2"
            >
              {/* If no file/files yet */}
              {!fileInfo && !fileGroup && (
                <div className="cross-center h-[inherit] w-full select-none">
                  <p className="dim">
                    {isMultiple ? "Some images" : "An image"} will be previewed
                    here
                  </p>
                </div>
              )}

              {/* If one file as a FileInfo */}
              {!isMultiple && fileInfo && (
                <Anchor href={String(fileInfo?.cdnUrl)}>
                  <Image
                    src={String(fileInfo?.cdnUrl)}
                    alt={String(fileInfo?.name)}
                    className="max-h-32 max-w-xs object-cover"
                  />
                </Anchor>
              )}

              {/* If multiple files as a FileGroup */}
              {isMultiple && Number(fileGroup?.count) > 0 && (
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
            disabled={!isSubmitEnabled}
          >
            Save {isMultiple ? "Images" : "Image"}
          </ButtonLoading>
        </RemixForm>

        <Debug name="state,actionData" isAlwaysShow>
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
