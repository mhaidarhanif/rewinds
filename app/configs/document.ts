/**
 * EDITME: Config Document Links and JSON-LD
 *
 * Favicons
 * Manifest
 * Style Sheets
 */

import { fontLinks } from "~/configs/fonts";
import tailwindStyles from "~/styles/tailwind.css";

export const stylesheetLinks = [{ rel: "stylesheet", href: tailwindStyles }];

/**
 * Docs:
 * - https://favicon.io
 * - https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs
 */
export const faviconLinks = [
  // Use this if you want to change the favicon quickly using emoji
  // {
  //   rel: "shortcut icon",
  //   href: "https://fav.farm/⏪",
  // },
  {
    rel: "shortcut icon",
    href: "/favicon.ico",
  },
  // Design and use your own favicon, or get some initial image from:
  // https://emojipedia.org
  {
    rel: "icon",
    type: "image/png",
    sizes: "32x32",
    href: "/favicons/favicon-32x32.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "16x16",
    href: "/favicons/favicon-16x16.png",
  },
  {
    rel: "apple-touch-icon",
    sizes: "180x180",
    href: "/favicons/apple-touch-icon.png",
  },
];

const manifestLinks = [
  /**
   * Remember to edit the manifest
   * Alternatively this can also be generated from a Remix route
   * Like in `app/other-root-routes.server.ts`
   */
  {
    rel: "manifest",
    href: "/site.webmanifest",
  },
];

export const configDocumentLinks = [
  ...fontLinks,
  ...stylesheetLinks,
  ...faviconLinks,
  ...manifestLinks,
];
