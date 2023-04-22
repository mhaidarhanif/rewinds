import { Widget } from "@uploadcare/react-widget";
import { useState } from "react";
import uploadcareTabEffects from "uploadcare-widget-tab-effects/react-en";

import { Alert, ButtonLoading, Debug } from "~/components";
import { useRootLoaderData } from "~/hooks";
import { uploadcareLocaleTranslations } from "./uploadcare.locale";

import type { FileInfo, WidgetProps } from "@uploadcare/react-widget";

import type { Prettify } from "~/types";

/**
 * Uploadcare Service Component
 *
 * This is still implemented using public key,
 * without server-side private key
 *
 * Docs:
 * - https://uploadcare.com
 */

type PrettifiedFileInfo = Prettify<FileInfo>;

interface UploadcareWidgetProps extends Partial<WidgetProps> {
  getUploadedFile?: (file: PrettifiedFileInfo) => void;
}

export function UploadcareWidget(props: UploadcareWidgetProps) {
  const {
    publicKey,
    tabs = "file camera url",
    previewStep = true,
    effects = ["crop", "sharp", "enhance"],
    getUploadedFile,
  } = props;

  const { ENV } = useRootLoaderData();
  const [widgetFileState, setWidgetFileState] = useState({});

  function handleChange(file: PrettifiedFileInfo) {
    // To set the local state
    setWidgetFileState(file);

    // To send file to parent component
    if (getUploadedFile) {
      getUploadedFile(file);
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
            publicKey={publicKey || ENV.UPLOADCARE_PUBLIC_KEY}
            tabs={tabs}
            previewStep={previewStep}
            effects={effects}
            customTabs={{ preview: uploadcareTabEffects }}
            localeTranslations={uploadcareLocaleTranslations}
            onChange={handleChange}
            preloader={
              <ButtonLoading size="sm" variant="subtle" isSubmitting />
            }
          />
        </div>
      )}

      <Debug name="widgetProps,widgetFileState">
        {{ props, widgetFileState }}
      </Debug>
    </div>
  );
}
