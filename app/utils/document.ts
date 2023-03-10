import { configMeta } from "~/configs/site";

export const createDocumentLinks = ({
  canonicalPath = configMeta?.canonicalPath,
  url = configMeta?.url,
}: {
  canonicalPath?: string;
  url?: string;
} = configMeta) => {
  return [
    {
      rel: "canonical",
      href: canonicalPath ? `${configMeta?.url}${canonicalPath}` : url,
    },
  ];
};
