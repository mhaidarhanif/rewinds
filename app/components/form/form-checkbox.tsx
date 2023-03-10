import { useField } from "remix-validated-form";

import { cn } from "~/utils";
// import { Checkbox } from "~/components";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  hidden?: boolean;
}

export const FormCheckbox = ({ name, label, hidden, ...props }: Props) => {
  const { error, getInputProps } = useField(name);
  const inputProps = getInputProps();

  return (
    <div className={cn(hidden && "hidden")}>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          {...getInputProps({ id: name })}
          checked={inputProps.defaultValue}
          {...props}
        />
        {/* <Checkbox
          {...getInputProps({ id: name })}
          checked={inputProps.defaultValue}
          {...props}
        /> */}

        {label && <label htmlFor={name}>{label}</label>}
      </div>

      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};
