// https://remix.run/docs/en/main/route/meta

import { configMeta, configSite } from "~/configs";

import type { V2_HtmlMetaDescriptor, V2_MetaFunction } from "@remix-run/node";

export function createMetaData({
  description = configMeta?.defaultDescription,
  locale = configMeta?.locale,
  name = configMeta?.defaultName,
  ogImageAlt = configMeta?.ogImageAlt,
  ogImagePath = configMeta?.ogImagePath,
  ogImageType = configMeta?.ogImageType,
  ogType = configMeta?.ogType,
  path = "/",
  themeColor = configMeta?.color,
  title = configMeta?.defaultTitle,
  twitterAuthorHandle = configMeta?.author.handle,
  twitterImagePath = configMeta?.twitterImagePath,
  url = configMeta?.url,
}: {
  description?: string;
  locale?: string;
  name?: string;
  ogImageAlt?: string;
  ogImagePath?: string;
  ogImageType?: string;
  ogType?: string;
  path?: string;
  themeColor?: string;
  title?: string;
  twitterAuthorHandle?: string;
  twitterImagePath?: string;
  url?: string;
} = configMeta): V2_HtmlMetaDescriptor[] {
  return [
    {
      title:
        title &&
        `${title} ${configMeta?.defaultTitleSeparator} ${configMeta?.defaultName}`,
    },
    {
      name: "description",
      content: description,
    },
    {
      name: "application-name",
      content: title,
    },
    {
      name: "apple-mobile-web-app-title",
      content: title,
    },
    {
      name: "theme-color",
      content: themeColor,
    },
    {
      name: "msapplication-TileColor",
      content: themeColor,
    },
    {
      name: "msapplication-config",
      content: `${configMeta?.url}/browserconfig.xml`,
    },
    {
      property: "og:site_name",
      content: name,
    },
    {
      property: "og:title",
      content: title,
    },
    {
      property: "og:description",
      content: description,
    },
    {
      property: "og:url",
      content: path ? `${configMeta?.url}${path}` : url,
    },
    {
      property: "og:type",
      content: ogType,
    },
    {
      property: "og:locale",
      content: locale,
    },
    {
      property: "og:image:alt",
      content: ogImageAlt,
    },
    {
      property: "og:image:type",
      content: ogImageType,
    },
    {
      property: "og:image",
      content: ogImagePath
        ? `${configMeta?.url}${ogImagePath}`
        : `${configMeta?.url}${configMeta?.ogImagePath}`,
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:site",
      content: twitterAuthorHandle,
    },
    {
      name: "twitter:creator",
      content: twitterAuthorHandle,
    },
    {
      name: "twitter:title",
      content: title,
    },
    {
      name: "twitter:description",
      content: description,
    },
    {
      name: "twitter:domain",
      content: configSite?.domain,
    },
    {
      name: "twitter:url",
      content: path ? `${configMeta?.url}${path}` : url || configMeta?.url,
    },
    {
      name: "twitter:image",
      content: twitterImagePath
        ? `${configMeta?.url}${twitterImagePath}`
        : `${configMeta?.url}${configMeta?.twitterImagePath}`,
    },
    { name: "fb:app_id", content: configMeta?.fbAppId },
  ];
}

// https://gist.github.com/ryanflorence/ec1849c6d690cfbffcb408ecd633e069
export function mergeMetaData(
  overrideFn: V2_MetaFunction,
  appendFn?: V2_MetaFunction
): V2_MetaFunction {
  return (arg) => {
    // get meta from parent routes
    let mergedMeta = arg.matches.reduce((acc, match) => {
      return acc.concat(match.meta || []);
    }, [] as V2_HtmlMetaDescriptor[]);

    // replace any parent meta with the same name or property with the override
    const overrides = overrideFn(arg);
    for (const override of overrides) {
      const index = mergedMeta.findIndex(
        (meta) =>
          ("name" in meta &&
            "name" in override &&
            meta.name === override.name) ||
          ("property" in meta &&
            "property" in override &&
            meta.property === override.property) ||
          ("title" in meta && "title" in override)
      );
      if (index !== -1) {
        mergedMeta.splice(index, 1, override);
      }
    }

    // append any additional meta
    if (appendFn) {
      mergedMeta = mergedMeta.concat(appendFn(arg));
    }

    return mergedMeta;
  };
}
