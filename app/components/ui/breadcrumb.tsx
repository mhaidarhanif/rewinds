import { cloneElement, forwardRef } from "react";

import { RemixLink } from "~/components";
import { ChevronRight } from "~/icons";
import { cn, getValidChildren } from "~/utils";

import type { RemixLinkProps } from "@remix-run/react/dist/components";

/**
 * Breadcrumb
 *
 * Breadcrumb trail is a graphical control element used
 * as a navigational aid in user interfaces and on web pages.
 * It allows users to keep track and maintain awareness of their locations
 * within programs, documents, or websites.
 */

export interface BreadcrumbProps extends React.ComponentPropsWithoutRef<"nav"> {
  /* The visual separator between each breadcrumb item */
  separator?: React.ReactNode;
  /**
   * If `true`, adds a separator between each breadcrumb item.
   * @default true
   */
  addSeparator?: boolean;
}

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  (
    {
      children,
      className,
      separator = <ChevronRight className="size-sm" />,
      addSeparator = true,
      ...props
    },
    forwardedRef
  ) => {
    const validChildren = getValidChildren(children);
    const clones = validChildren.map((child, index) => {
      return cloneElement(child, {
        addSeparator,
        separator,
        lastChild: validChildren.length === index + 1,
      });
    });

    return (
      <nav
        className={cn("relative break-words", className)}
        aria-label="breadcrumb"
        {...props}
        ref={forwardedRef}
      >
        <ol className="flex items-center">{clones}</ol>
      </nav>
    );
  }
);
Breadcrumb.displayName = "Breadcrumb";

export interface BreadcrumbItemProps extends BreadcrumbProps {
  /**
   * If `true`, indicates that the breadcrumb item is active, adds
   * `aria-current=page` and renders a `span`
   */
  isCurrentPage?: boolean;
  lastChild?: boolean;
}

export const BreadcrumbItem = forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  (
    {
      children,
      className,
      isCurrentPage,
      lastChild,
      separator,
      addSeparator,
      ...props
    },
    forwardedRef
  ) => {
    const validChildren = getValidChildren(children);
    const clones = validChildren.map((child) => {
      if (child.type === BreadcrumbLink) {
        return cloneElement(child, { isCurrentPage });
      }

      if (child.type === BreadcrumbSeparator) {
        return cloneElement(child, {
          children: separator || child.props.children,
        });
      }

      return child;
    });

    return (
      <li
        className={cn("inline-flex items-center", className)}
        {...props}
        ref={forwardedRef}
      >
        {clones}
        {!lastChild && addSeparator && (
          <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>
        )}
      </li>
    );
  }
);
BreadcrumbItem.displayName = "BreadcrumbItem";

export interface BreadcrumbLinkProps
  extends RemixLinkProps,
    React.ComponentPropsWithoutRef<"a">,
    Pick<BreadcrumbItemProps, "isCurrentPage"> {
  as?: React.ElementType;
}

export const BreadcrumbLink = forwardRef<
  HTMLAnchorElement,
  BreadcrumbLinkProps
>(({ className, as: asComp, isCurrentPage, ...props }, forwardedRef) => {
  const Comp = (isCurrentPage ? "a" : asComp || "a") as "a";

  return (
    <Comp
      className={cn(
        "cursor-pointer text-sm font-medium underline-offset-4 transition-colors hover:underline",
        "aria-[current]:font-bold",
        className
      )}
      aria-current={isCurrentPage ? "page" : undefined}
      {...props}
      ref={forwardedRef}
    />
  );
});
BreadcrumbLink.displayName = "BreadcrumbLink";

export type BreadcrumbSeparatorProps = React.ComponentPropsWithoutRef<"span">;

export const BreadcrumbSeparator = forwardRef<
  HTMLSpanElement,
  BreadcrumbSeparatorProps
>(({ className, ...props }, forwardedRef) => {
  return (
    <span
      className={cn("mx-1 opacity-50 sm:mx-2", className)}
      role="presentation"
      {...props}
      ref={forwardedRef}
    />
  );
});
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

export function BreadcrumbAuto({
  separator,
  items,
}: {
  separator?: React.ReactNode;
  items: {
    to: string;
    name: string;
    isCurrentPage?: boolean;
  }[];
}) {
  return (
    <Breadcrumb separator={separator}>
      {items.map((item) => {
        return (
          <BreadcrumbItem key={item.to} isCurrentPage={item.isCurrentPage}>
            <BreadcrumbLink as={RemixLink} to={item.to}>
              {item.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
}
