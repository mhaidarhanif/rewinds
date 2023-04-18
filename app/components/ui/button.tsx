import { cva } from "class-variance-authority";
import { forwardRef } from "react";

import { cn } from "~/utils";

import type { VariantProps } from "class-variance-authority";

/**
 * Button
 *
 * Displays a button or a component that looks like a button.
 */

export const buttonVariants = cva(
  cn(
    "z-auto inline-flex select-none transition-colors active:translate-y-px",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 dark:focus-visible:ring-brand-400 dark:focus-visible:ring-offset-brand-900",
    "data-[state=open]:bg-surface-100 dark:data-[state=open]:bg-surface-700"
  ),
  {
    variants: {
      variant: {
        default:
          "border-2 border-brand-800 bg-brand-600 text-white hover:bg-brand-700 dark:border-brand-400",
        info: "border-2 border-blue-800 bg-blue-600 text-blue-50 hover:bg-blue-700 dark:border-blue-400",
        success:
          "border-2 border-green-800 bg-green-600 text-green-50 hover:bg-green-700 dark:border-green-400",
        warning:
          "border-2 border-yellow-800 bg-yellow-600 text-yellow-50 hover:bg-yellow-700 dark:border-yellow-400",
        danger:
          "border-2 border-red-800 bg-red-600 text-red-50 hover:bg-red-700 dark:border-red-400",
        subtle:
          "bg-brand-500/20 text-brand-800 hover:bg-brand-500/50 dark:bg-brand-900 dark:text-brand-200 hover:dark:bg-brand-800",
        outline:
          "border-2 border-surface-100 bg-transparent text-brand-800 hover:bg-surface-100/30 dark:border-surface-800 dark:text-brand-200 hover:dark:bg-surface-800/30",
        ghost: "text-brand-800 hover:bg-brand-500/20 dark:text-brand-100",
        none: "",
        link: "bg-transparent text-brand-800 underline-offset-4 hover:bg-transparent hover:underline dark:text-brand-200",
        navlink:
          "text-xs hover:bg-brand-100 hover:dark:bg-brand-900 sm:text-sm",
      },
      align: {
        default: "items-center justify-center text-center",
        left: "items-center justify-start text-left",
      },
      accent: {
        default: "",
        dim: "dim dark:dim hover:dim-hover",
        red: "text-red-800 dark:text-red-500",
        green: "text-green-800 dark:text-green-500",
        blue: "text-blue-800 dark:text-blue-500",
      },
      radius: {
        default: "",
        full: "rounded-full",
      },
      weight: {
        default: "font-semibold",
        bold: "font-bold",
      },
      size: {
        xs: "",
        sm: "",
        default: "",
        lg: "",
      },
      withIndicator: {
        true: "",
        false: "",
      },
      isIcon: {
        true: "",
        false: "",
      },
      isActive: {
        // to be used with variant="navlink"
        true: "bg-brand-100 dark:bg-brand-900",
        false: "",
      },
    },
    compoundVariants: [
      {
        isIcon: false,
        size: "xs",
        radius: "default",
        class: "h-6 gap-1 rounded px-2 text-xs",
      },
      {
        isIcon: false,
        size: "sm",
        radius: "default",
        class: "h-7 gap-2 rounded px-2 text-sm sm:h-8 sm:px-3",
      },
      {
        isIcon: false,
        size: "default",
        radius: "default",
        class: "h-9 gap-2 rounded-md px-3 sm:h-10 sm:px-4",
      },
      {
        isIcon: false,
        size: "lg",
        radius: "default",
        class: "h-11 gap-3 rounded-lg px-4 text-lg sm:h-12 sm:px-5",
      },
      {
        isIcon: false,
        variant: "navlink",
        radius: "default",
        class: "h-8 gap-2 rounded-md px-1 sm:h-9 sm:px-2",
      },
      {
        isIcon: true,
        size: "xs",
        radius: "default",
        class: "h-6 w-6 rounded",
      },
      {
        isIcon: true,
        size: "sm",
        radius: "default",
        class: "h-7 w-7 rounded sm:h-8 sm:w-8",
      },
      {
        isIcon: true,
        size: "default",
        radius: "default",
        class: "h-9 w-9 rounded-md sm:h-10 sm:w-10",
      },
      {
        isIcon: true,
        size: "lg",
        radius: "default",
        class: "h-11 w-11 rounded-lg sm:h-12 sm:w-12",
      },
      {
        isIcon: true,
        size: "default",
        radius: "full",
        class: "h-9 w-9 sm:h-10 sm:w-10",
      },
      {
        isIcon: false,
        radius: "full",
        class: "px-4 py-1",
      },
    ],
    defaultVariants: {
      variant: "default",
      accent: "default",
      size: "default",
      weight: "default",
      align: "default",
      radius: "default",
      isIcon: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = "submit",
      variant = "default",
      accent = "default",
      size = "default",
      weight = "default",
      radius = "default",
      align = "default",
      className,
      ...props
    },
    ref
  ) => {
    return (
      <button
        type={type}
        ref={ref}
        className={cn(
          buttonVariants({
            variant,
            accent,
            size,
            weight,
            radius,
            align,
            isIcon: false,
            className,
          })
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
