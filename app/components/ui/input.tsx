import { forwardRef, useState } from "react";

import { Eye, EyeOff } from "~/icons";
import { cn } from "~/utils";

import { Button } from "./button";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        spellCheck={false}
        className={cn(
          "bg-surface-50 dark:bg-surface-900",
          "flex h-10 w-full rounded-md border border-surface-300 py-2 px-3 text-sm placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-surface-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-surface-700 dark:text-surface-50 dark:placeholder:text-surface-700 dark:focus:ring-surface-400 dark:focus:ring-offset-surface-900",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export function InputPassword({
  type = "password",
  placeholder = "Enter password",
  className,
  ...props
}: InputProps) {
  const [isShown, setIsShown] = useState<boolean>(false);

  function handleClick() {
    setIsShown(!isShown);
  }

  return (
    <div className="relative">
      <Input
        data-component="input-password"
        type={isShown ? "text" : "password"}
        placeholder={placeholder}
        {...props}
      />
      <Button
        size="xs"
        variant="subtle"
        onClick={handleClick}
        className={cn(
          "height-[inherit] absolute inset-y-0 right-0 my-2 mr-2 font-mono"
        )}
      >
        {isShown ? <EyeOff className="size-xs" /> : <Eye className="size-xs" />}
        <span>{isShown ? "Hide" : "Show"}</span>
      </Button>
    </div>
  );
}
