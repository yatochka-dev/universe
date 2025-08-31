import type { CollectionConfig, Option } from "payload";
import { sendWebhook, WebhookPayloadBuilder } from "~/lib/discordWebhook";
import { env } from "~/env";
import type { Contact } from "../../payload-types";
import payload from "~/data-access";

export const ResourceTypes: CollectionConfig = {
  slug: "resource-types",
  admin: {
    useAsTitle: "label",
  },
  fields: [
    {
      name: "label",
      label: "Label",
      type: "text",
      required: true,
    },
  ],
};

export default ResourceTypes;
