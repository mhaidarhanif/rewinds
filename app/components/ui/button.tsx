import { cva } from "class-variance-authority";
import { forwardRef } from "react";

import { cn } from "~/utils";

import type { VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  cn(
    "flex z-auto select-none active:translate-y-px inline-flex items-center justify-center transition-all",
    "disabled:opacity-50 disabled:pointer-events-none",
    "focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2 dark:focus:ring-brand-400 dark:focus:ring-offset-brand-900",
    "data-[state=open]:bg-brand-100 dark:data-[state=open]:bg-brand-800"
  ),
  {
    variants: {
      variant: {
        default:
          "text-white bg-brand-600 hover:bg-brand-700 border-2 border-brand-800 dark:border-brand-400",
        info: "text-blue-50 bg-blue-600 hover:bg-blue-700 border-2 border-blue-800 dark:border-blue-500",
        success:
          "text-green-50 bg-green-600 hover:bg-green-700 border-2 border-green-800 dark:border-green-500",
        warning:
          "text-yellow-50 bg-yellow-600 hover:bg-yellow-700 border-2 border-yellow-800 dark:border-yellow-500",
        danger:
          "text-red-50 bg-red-600 hover:bg-red-700 border-2 border-red-800 dark:border-red-500",
        subtle:
          "text-brand-800 bg-brand-500/20 hover:bg-brand-500/50 dark:text-brand-200 dark:bg-brand-900 hover:dark:bg-brand-800",
        outline:
          "text-brand-800 bg-transparent border-2 border-brand-800 hover:bg-brand-500/20 dark:text-brand-200 hover:dark:bg-brand-800/50",
        ghost:
          "text-brand-800 bg-transparent hover:bg-brand-500/20 data-[state=open]:bg-transparent dark:text-brand-100 dark:data-[state=open]:bg-transparent",
        link: "text-brand-800 bg-transparent underline-offset-4 hover:underline hover:bg-transparent dark:text-brand-200",
      },
      accent: {
        default: "",
        surface:
          "text-surface-300 hover:text-surface-500 dark:text-surface-700 hover:dark:text-surface-500",
        red: "text-red-500",
        green: "text-green-500",
        blue: "text-blue-500",
      },
      radius: {
        default: "rounded",
        full: "rounded-full",
      },
      weight: {
        default: "font-semibold",
        bold: "font-bold",
      },
      isIcon: {
        true: "",
        false: "",
      },
      size: {
        xs: "",
        sm: "",
        default: "",
        lg: "",
        fixed: "",
      },
      noIndicator: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        isIcon: false,
        size: "xs",
        class: "h-5 px-1 sm:h-6 sm:px-2 rounded text-xs gap-1",
      },
      {
        isIcon: false,
        size: "sm",
        class: "h-7 px-2 sm:h-8 sm:px-3 rounded text-sm gap-2",
      },
      {
        isIcon: false,
        size: "default",
        class: "h-9 sm:h-10 px-3 sm:px-4 rounded-md gap-2",
      },
      {
        isIcon: false,
        size: "lg",
        class: "h-11 sm:h-12 px-4 sm:px-5 rounded-lg text-lg gap-3",
      },
      {
        isIcon: true,
        size: "fixed",
        class: "rounded-md h-10 w-10",
      },
      {
        isIcon: true,
        size: "xs",
        class: "rounded h-5 w-5 sm:h-6 sm:w-6",
      },
      {
        isIcon: true,
        size: "sm",
        class: "rounded h-7 w-7 sm:h-8 sm:w-8",
      },
      {
        isIcon: true,
        size: "default",
        class: "rounded-md h-9 w-9 sm:h-10 sm:w-10",
      },
      {
        isIcon: true,
        size: "lg",
        class: "rounded-lg h-11 w-11 sm:h-12 sm:w-12",
      },
    ],
    defaultVariants: {
      variant: "default",
      weight: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "default",
      accent = "default",
      size = "default",
      weight = "default",
      radius = "default",
      className,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(
          buttonVariants({
            variant,
            accent,
            weight,
            radius,
            isIcon: false,
            size,
            className,
          })
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
