import { useState } from "react";

import { Button } from "~/components";
import { Copy, Check } from "~/icons";

import type { ButtonProps } from "~/components";

interface Props extends ButtonProps {
  contentToCopy: string;
  copyIcon?: React.ReactNode;
  successIcon?: React.ReactNode;
  withText?: boolean;
}

export function CopyButton({
  className,
  contentToCopy,
  copyIcon,
  successIcon,
  withText,
  ...props
}: Props) {
  const [copied, setCopied] = useState(false);

  return (
    <Button
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
      {withText && <span>Copy</span>}
    </Button>
  );
}
CopyButton.displayName = "Copy Button";
