import { useField } from "remix-validated-form";

import { Input, Label } from "~/components";
import { cn } from "~/utils";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  helpText?: string;
}

export const FormInput = ({
  name,
  label,
  hidden,
  className,
  helpText,
  ...props
}: Props) => {
  const { error, getInputProps } = useField(name);

  return (
    <div className={cn(hidden && "hidden space-y-1", className)}>
      {label && <Label htmlFor={name}>{label}</Label>}
      <Input {...getInputProps({ id: name })} {...props} />
      <p className="text-sm text-surface-500">{helpText}</p>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};
