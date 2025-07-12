import type { CollectionConfig, AfterChangeHook } from "payload/types";
import sendDiscordWebhook from "~/lib/discordWebhook";

const notifyDiscord: AfterChangeHook = async ({ doc, operation }) => {
  if (operation === "create") {
    await sendDiscordWebhook(doc);
  }
};

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
    afterChange: [notifyDiscord],
  },
};

export default Contacts;
