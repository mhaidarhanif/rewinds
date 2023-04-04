import { IKImage, IKContext, IKUpload } from "imagekitio-react";
import { useRef, useState } from "react";

import { Button, Debug } from "~/components";
import { configSite } from "~/configs";
import { createNanoID } from "~/utils";

export { IKImage, IKContext, IKUpload };

export type ImageKitResponse = {
  fileId: string;
  filePath: string;
  thumbnailUrl: string;
  url: string;
};

export function ImageKitUploader({
  addImageAssets,
}: {
  addImageAssets?: (args: ImageKitResponse) => unknown;
}) {
  const inputRef = useRef<any>(null);
  const ikUploadRef = useRef<any>(null);

  const [uploadState, setUploadState] = useState<
    null | "start" | "progress" | "success" | "error"
  >();
  const [uploadedImageAssets, setUploadedImageAssets] = useState<
    ImageKitResponse[]
  >([]);

  const fileNameTemplate = `${configSite.slug}-${createNanoID}`;
  const isUploading = uploadState === "start" || uploadState === "progress";

  const onError = (err: any) => {
    console.error("UPLOAD_ERROR", err);
    setUploadState("error");
  };

  const onUploadStart = (evt: any) => {
    console.info("UPLOAD_START", evt);
    setUploadState("start");
  };

  const onUploadProgress = (progress: any) => {
    console.info("UPLOAD_PROGRESS", progress);
    setUploadState("progress");
  };

  const onSuccess = (response: any) => {
    console.info("UPLOAD_SUCCESS", response);
    setUploadState("success");

    // Used for the upload preview
    setUploadedImageAssets([...uploadedImageAssets, response]);

    // Send data to the parent component if the function is available
    addImageAssets?.(response);
  };

  const handleClickUpload = () => {
    inputRef?.current.click();
  };

  const handleClickCancel = () => {
    ikUploadRef?.current.abort();
    setUploadState(null);
  };

  return (
    <>
      <IKUpload
        fileName={fileNameTemplate}
        tags={["upload", "product"]}
        isPrivateFile={false}
        useUniqueFileName={true}
        responseFields={["tags"]}
        validateFile={(file: File) => file.size < 2000000}
        folder={"/uploads"}
        onError={onError}
        onUploadStart={onUploadStart}
        onUploadProgress={onUploadProgress}
        onSuccess={onSuccess}
        style={{ display: "none" }}
        inputRef={inputRef}
        ref={ikUploadRef}
      />

      <div className="space-y-1">
        <p>Upload images (one by one)</p>
        <div className="queue-center">
          {inputRef && (
            <Button
              size="sm"
              onClick={handleClickUpload}
              disabled={isUploading}
            >
              {isUploading ? "Mengunggah..." : "Unggah"}
            </Button>
          )}
          {ikUploadRef && (
            <Button
              size="sm"
              onClick={handleClickCancel}
              disabled={!isUploading}
            >
              Batal
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

// Adjust according to Prisma schema model
export type ImageAsset = {
  url: string;
  filePath: string;
};

export function ImageKitUploadsPreviewer({
  imageAssets,
}: {
  imageAssets: ImageAsset[];
}) {
  return (
    <div>
      <div className="queue-center mt-2 rounded border bg-surface-50 p-2 dark:bg-surface-200">
        {!imageAssets.length && (
          <div className="h-24 w-24 select-none flex-wrap items-center justify-center rounded border bg-white">
            <p className="break-words text-center text-xs font-bold">
              ImageAssets will be shown here
            </p>
          </div>
        )}

        {Boolean(imageAssets.length) &&
          imageAssets.map((imageasset, index) => {
            return (
              <IKImage
                key={index}
                className="h-32 w-32 rounded border object-cover"
                path={String(imageasset.filePath)}
                width={100}
                height={100}
                transformation={[{ height: "200", width: "200" }]}
              />
            );
          })}
      </div>

      <Debug name="imageAssets">{imageAssets}</Debug>
    </div>
  );
}
