import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva } from "class-variance-authority";
import { forwardRef } from "react";

import { X } from "~/icons";
import { cn } from "~/utils";

/**
 * Toast
 *
 * A succinct message that is displayed temporarily.
 *
 * Alternatives:
 * - React Hot Toast: https://react-hot-toast.com
 */

import type { VariantProps } from "class-variance-authority";

export const ToastProvider = ToastPrimitives.Provider;

export const ToastViewport = forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed bottom-0 z-40 flex max-h-screen w-full flex-col-reverse p-2 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    )}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

export const toastVariants = cva(
  cn(
    "p-4 pe-8",
    "data-[swipe=move]:transition-none grow-1 group relative pointer-events-auto flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border-2 shadow-lg transition-all data-[swipe=move]:translate-x-[--radix-toast-swipe-move-x] data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[--radix-toast-swipe-end-x] data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=open]:slide-in-from-bottom-full data-[state=open]:sm:slide-in-from-bottom-full mt-4 data-[state=closed]:slide-out-to-bottom-full dark:border-surface-700 last:mt-0 sm:last:mt-4"
  ),
  {
    variants: {
      variant: {
        default:
          "border-surface-200 bg-white dark:border-surface-700 dark:bg-surface-800",
        success:
          "success group border-green-600 bg-green-600 text-white dark:border-green-600 dark:bg-green-900",
        danger:
          "danger group border-red-600 bg-red-600 text-white dark:border-red-600 dark:bg-red-900",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const Toast = forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;

export const ToastAction = forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "disabled:opacity-50dark:border-surface-700 inline-flex h-8 shrink-0 items-center justify-center rounded-md border-2 border-surface-200 bg-transparent px-3 text-sm font-medium transition-colors hover:bg-surface-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface-400 focus-visible:ring-offset-2 disabled:pointer-events-none dark:text-surface-100 dark:hover:bg-surface-700 dark:hover:text-surface-100 dark:focus-visible:ring-surface-400 dark:focus-visible:ring-offset-surface-900 dark:data-[state=open]:bg-surface-800",
      "group-[.success]:border-green-100 group-[.success]:hover:border-surface-50 group-[.success]:hover:bg-green-100 group-[.success]:hover:text-green-600 group-[.success]:focus-visible:ring-green-400 group-[.success]:focus-visible:ring-offset-green-600",
      "group-[.danger]:border-red-100 group-[.danger]:hover:border-surface-50 group-[.danger]:hover:bg-red-100 group-[.danger]:hover:text-red-600 group-[.danger]:focus-visible:ring-red-400 group-[.danger]:focus-visible:ring-offset-red-600",
      className
    )}
    {...props}
  />
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

export const ToastClose = forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 text-surface-500 transition-opacity hover:text-surface-900 focus-visible:outline-none focus-visible:ring-2 group-hover:opacity-100",
      "group-[.success]:text-green-300 group-[.success]:hover:text-green-50 group-[.success]:focus-visible:ring-green-400 group-[.success]:focus-visible:ring-offset-green-600 dark:hover:text-surface-50",
      "group-[.danger]:text-red-300 group-[.danger]:hover:text-red-50 group-[.danger]:focus-visible:ring-red-400 group-[.danger]:focus-visible:ring-offset-red-600 dark:hover:text-surface-50",
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="size-sm" />
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

export const ToastTitle = forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-sm font-semibold", className)}
    {...props}
  />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

export const ToastDescription = forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("text-sm opacity-90", className)}
    {...props}
  />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

export type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;

export type ToastActionElement = React.ReactElement<typeof ToastAction>;
