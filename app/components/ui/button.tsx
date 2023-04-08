import { cva } from "class-variance-authority";
import { forwardRef } from "react";

import { cn } from "~/utils";

import type { VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  cn(
    "z-auto inline-flex select-none transition-colors active:translate-y-px",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 dark:focus-visible:ring-brand-400 dark:focus-visible:ring-offset-brand-900",
    "data-[state=open]:bg-brand-100 dark:data-[state=open]:bg-brand-800"
  ),
  {
    variants: {
      variant: {
        default:
          "text-white bg-brand-600 hover:bg-brand-700 border-2 border-brand-800 dark:border-brand-400",
        info: "text-blue-50 bg-blue-600 hover:bg-blue-700 border-2 border-blue-800 dark:border-blue-400",
        success:
          "text-green-50 bg-green-600 hover:bg-green-700 border-2 border-green-800 dark:border-green-400",
        warning:
          "text-yellow-50 bg-yellow-600 hover:bg-yellow-700 border-2 border-yellow-800 dark:border-yellow-400",
        danger:
          "text-red-50 bg-red-600 hover:bg-red-700 border-2 border-red-800 dark:border-red-400",
        subtle:
          "text-brand-800 bg-brand-500/20 hover:bg-brand-500/50 dark:text-brand-200 dark:bg-brand-900 hover:dark:bg-brand-800",
        outline:
          "text-brand-800 bg-transparent border-2 border-brand-800 hover:bg-brand-500/20 dark:text-brand-200 hover:dark:bg-brand-800/50",
        ghost:
          "text-brand-800 bg-transparent hover:bg-brand-500/20 data-[state=open]:bg-transparent dark:text-brand-100 dark:data-[state=open]:bg-transparent",
        link: "text-brand-800 bg-transparent underline-offset-4 hover:underline hover:bg-transparent dark:text-brand-200",
        navlink:
          "text-xs sm:text-sm hover:bg-brand-100 hover:dark:bg-brand-900",
      },
      align: {
        default: "text-center justify-center items-center",
        left: "text-left justify-left items-center",
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
      noIndicator: {
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
        class: "h-6 px-2 rounded text-xs gap-1",
      },
      {
        isIcon: false,
        size: "sm",
        radius: "default",
        class: "h-7 px-2 sm:h-8 sm:px-3 rounded text-sm gap-2",
      },
      {
        isIcon: false,
        size: "default",
        radius: "default",
        class: "h-9 sm:h-10 px-3 sm:px-4 rounded-md gap-2",
      },
      {
        isIcon: false,
        size: "lg",
        radius: "default",
        class: "h-11 sm:h-12 px-4 sm:px-5 rounded-lg text-lg gap-3",
      },
      {
        isIcon: false,
        variant: "navlink",
        radius: "default",
        class: "h-8 sm:h-9 px-1 sm:px-2 rounded-md gap-2",
      },
      {
        isIcon: true,
        size: "xs",
        radius: "default",
        class: "rounded h-6 w-6",
      },
      {
        isIcon: true,
        size: "sm",
        radius: "default",
        class: "rounded h-7 w-7 sm:h-8 sm:w-8",
      },
      {
        isIcon: true,
        size: "default",
        radius: "default",
        class: "rounded-md h-9 w-9 sm:h-10 sm:w-10",
      },
      {
        isIcon: true,
        size: "lg",
        radius: "default",
        class: "rounded-lg h-11 w-11 sm:h-12 sm:w-12",
      },
      {
        isIcon: true,
        size: "default",
        radius: "full",
        class: "h-9 w-9 sm:h-10 sm:w-10",
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
