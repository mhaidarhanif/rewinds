import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { forwardRef } from "react";

import { cn, createAvatarPlaceholderURL, getNameInitials } from "~/utils";

/**
 * Avatar
 *
 * An image element with a fallback for representing the user or organization.
 */

import type { UserData } from "~/helpers";

export const Avatar = forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      "bg-surface-100 dark:bg-surface-800",
      className
    )}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

export const AvatarImage = forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

export const AvatarFallback = forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-surface-100 dark:bg-surface-700",
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

/**
 * Avatar Auto
 *
 * Can refactor later with variant to handle size
 */
export function AvatarAuto({
  user,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & {
  user: Pick<UserData, "username" | "name">;
}) {
  const imageURL = createAvatarPlaceholderURL(user);

  return (
    <Avatar {...props}>
      <AvatarImage src={imageURL} alt={user.name} />
      {!imageURL && (
        <AvatarFallback>{getNameInitials(user.name)}</AvatarFallback>
      )}
    </Avatar>
  );
}
