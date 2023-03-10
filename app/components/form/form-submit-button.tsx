import { useIsSubmitting } from "remix-validated-form";

import { Button } from "~/components";

import type { ReactNode } from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loadingChildren?: ReactNode;
}

export const FormSubmitButton = ({
  children = "Submit",
  loadingChildren = "Submitting...",
  ...props
}: Props) => {
  const isSubmitting = useIsSubmitting();

  return (
    <Button type="submit" disabled={isSubmitting} {...props}>
      {isSubmitting ? loadingChildren : children}
    </Button>
  );
};
