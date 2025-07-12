import type { CollectionConfig } from "payload";
import sendDiscordWebhook from "~/lib/discordWebhook";

export const Contacts: CollectionConfig = {
  slug: "contacts",
  admin: {
    useAsTitle: "email",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "email",
      type: "email",
      required: true,
    },
    {
      name: "message",
      type: "textarea",
      required: true,
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, operation }) => {
        if (operation === "create") {
          await sendDiscordWebhook(
            doc as {
              name: string;
              email: string;
              message: string;
            },
          );
        }
      },
    ],
  },
};

export default Contacts;
