import { Widget } from "@uploadcare/react-widget";
import { useState } from "react";
import uploadcareTabEffects from "uploadcare-widget-tab-effects/react-en";

import { Alert, ButtonLoading, Debug } from "~/components";
import { useRootLoaderData } from "~/hooks";
import { uploadcareLocaleTranslations } from "./uploadcare.locale";

import type {
  FileInfo,
  WidgetProps,
  FileGroup,
} from "@uploadcare/react-widget";

/**
 * Uploadcare Service Component
 *
 * - This is using the older uploader widget, as the newest is still in beta
 * - This is implemented using public key, without server-side private key yet
 *
 * Docs:
 * - https://uploadcare.com
 * - https://uploadcare.com/docs/uploads/file-uploader
 */

interface UploadcareWidgetProps extends Partial<WidgetProps> {
  handleUploaded?: (file: FileInfo | FileGroup) => void;
  isDemo?: boolean;
  isAlwaysShowDebug?: boolean;
}

export function UploadcareWidget(props: UploadcareWidgetProps) {
  const {
    // WidgetProps
    publicKey,
    multiple,
    tabs = "file url camera",
    previewStep = true,
    effects = ["crop", "sharp", "enhance"],

    // Custom
    handleUploaded,
    isDemo,
    isAlwaysShowDebug = false
  } = props;

  const { ENV } = useRootLoaderData();
  const [widgetFileState, setWidgetFileState] = useState({});

  function handleChange(fileObject: FileInfo | FileGroup) {
    // To set the local state
    setWidgetFileState(fileObject);

    // To send FileInfo or FileGroup to parent component
    if (handleUploaded) {
      handleUploaded(fileObject);
    }
  }

  return (
    <div className="stack-start">
      {!ENV.UPLOADCARE_PUBLIC_KEY && (
        <Alert variant="warning">
          Sorry, the upload feature is currently unavailable.
        </Alert>
      )}

      {ENV.UPLOADCARE_PUBLIC_KEY && (
        <div className="queue-center h-8 w-full">
          <Widget
            publicKey={
              isDemo ? "demopublickey" : publicKey || ENV.UPLOADCARE_PUBLIC_KEY
            }
            onChange={handleChange}
            multiple={multiple}
            tabs={tabs}
            previewStep={previewStep}
            effects={effects}
            customTabs={{ preview: uploadcareTabEffects }}
            localeTranslations={uploadcareLocaleTranslations}
            preloader={
              <ButtonLoading
                size="sm"
                variant="subtle"
                isSubmitting
                isDisabledWhenLoading={false}
              />
            }
          />
        </div>
      )}

      {ENV.UPLOADCARE_PUBLIC_KEY && (
        <Debug name="widgetProps,widgetFileState" isAlwaysShow={isAlwaysShowDebug}>
          {{ props, widgetFileState }}
        </Debug>
      )}
    </div>
  );
}
