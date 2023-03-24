/**
 * EDITME: Site Config and Meta Config
 *
 * Site-wide info and meta data, mostly for information and SEO purpose
 */

import { configDev } from "~/configs";

// For general
export const configSite = {
  domain: configDev.isDevelopment
    ? "localhost:3000"
    : "rewinds.mhaidarhanif.com",

  slug: "rewinds",
  name: "Rewinds",
  title: "Rewinds: Remix Tailwind Starter Kit",
  description:
    "Rewinds is a web app starter kit with Remix, Tailwind CSS, Radix UI, and their ecosystem. Made by @mhaidarhanif.",

  links: {
    website: "https://mhaidarhanif.com",
    github: "https://github.com/mhaidarhanif/rewinds",
    twitter: "https://twitter.com/mhaidarhanif",
    youtube: "https://youtube.com/mhaidarhanif",
    facebook: "https://facebook.com/mhaidarhanif",
    instagram: "https://instagram.com/mhaidarhanif_",
    devTo: "https://dev.to/mhaidarhanif",
    hashnode: "https://hashnode.com/mhaidarhanif",
    showwcase: "https://showwcase.com/mhaidarhanif",
  },

  twitter: {
    site: "@mhaidarhanif",
    creator: "@mhaidarhanif",
  },

  navItems: [
    { to: "/", name: "Home", icon: "home" },
    { to: "/about", name: "About", icon: "about" },
    { to: "/components", name: "Components", icon: "components" },
    { to: "/demo", name: "Demo", icon: "demo" },
    { to: "/notes", name: "Notes", icon: "notes" },
  ],
};

// For Remix meta function
export const configMeta = {
  defaultName: configSite?.name,
  defaultTitle: configSite?.title,
  defaultTitleSeparator: "—",
  defaultDescription: configSite?.description,

  locale: "en_US",
  url: configDev.isDevelopment
    ? "http://localhost:3000"
    : `https://${configSite?.domain}`,
  canonicalPath: "/",
  color: "#3399cc",
  ogType: "website",
  ogImageAlt: configSite?.title,
  ogImageType: "image/png",
  ogImagePath: "/assets/opengraph/rewinds-og.png",
  twitterImagePath: "/assets/opengraph/rewinds-og.png",
  fbAppId: "",

  author: {
    name: "M Haidar Hanif",
    handle: "@mhaidarhanif",
    url: "https://mhaidarhanif.com",
    company: {
      name: "Catamyst",
      handle: "@catamyst",
      url: "https://catamyst.com",
    },
  },

  mailingListName: "Rewind and Catalyze",
};
