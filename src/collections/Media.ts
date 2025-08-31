import type { CollectionConfig } from "payload";
import * as path from "node:path";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
  },
  upload: {
    // only png, jpg, webp and ico
    mimeTypes: [
      "image/png",
      "image/jpeg",
      "image/webp",
      "image/x-icon",
      "image/vnd.microsoft.icon",
    ],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      defaultValue: "", // Alt text should be descriptive of the actual image content
    },
  ],
};
