import { useField } from "remix-validated-form";

import { Label, TextArea } from "~/components";
import { cn } from "~/utils";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
  helpText?: string;
}

export const FormTextArea = ({
  name,
  label,
  rows = 10,
  hidden,
  className,
  helpText,
  ...props
}: Props) => {
  const { error, getInputProps } = useField(name);

  return (
    <div className={cn(hidden && "hidden space-y-1", className)}>
      <Label htmlFor={name}>{label}</Label>
      <TextArea rows={rows} {...getInputProps({ id: name })} {...props} />
      <p className="text-sm text-surface-500">{helpText}</p>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};
