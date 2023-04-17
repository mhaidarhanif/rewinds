import { useState } from "react";

import { Button } from "~/components";
import { Copy, Check } from "~/icons";

import type { ButtonProps } from "~/components";

/**
 * Button Copy
 *
 * Button with copy to clipboard functionality.
 */

interface Props extends ButtonProps {
  contentToCopy?: string | undefined;
  copyIcon?: React.ReactNode;
  successIcon?: React.ReactNode;
  withText?: boolean;
  text?: string;
}

export function ButtonCopy({
  className,
  contentToCopy = "",
  copyIcon,
  successIcon,
  withText,
  text,
  ...props
}: Props) {
  const [copied, setCopied] = useState(false);

  return (
    <Button
      type="button"
      onClick={() => {
        navigator.clipboard.writeText(contentToCopy || "");
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 1000);
      }}
      className={className}
      {...props}
    >
      {copied
        ? successIcon || <Check className="size-sm text-green-500" />
        : copyIcon || <Copy className="size-sm" />}
      {!text && withText && <span>Copy</span>}
      {text}
    </Button>
  );
}
ButtonCopy.displayName = "Button Copy";
