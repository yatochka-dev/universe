import type { CollectionConfig, Option } from "payload";
import { sendWebhook, WebhookPayloadBuilder } from "~/lib/discordWebhook";
import { env } from "~/env";
import type { Contact } from "../../payload-types";
import payload from "~/data-access";

export const Resources: CollectionConfig = {
  slug: "resources",
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      label: "Title",
      type: "text",
      required: true,
    },
    {
      name: "type",
      label: "Type",
      type: "relationship",
      relationTo: "resource-types",
      required: true,
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      required: true,
    },
    {
      name: "content",
      type: "richText",
      required: true,
    },
  ],
};

export default Resources;
