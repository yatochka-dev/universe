import type { CollectionConfig, Option } from "payload";
import sendDiscordWebhook from "~/lib/discordWebhook";

export const inquiryTypes = [
  { value: "general", label: "General Inquiry" },
  { value: "partnership", label: "Partnership" },
  { value: "speaking", label: "Speaking Opportunity" },
  { value: "sponsor", label: "Sponsorship" },
  { value: "join-team", label: "Join the Team" },
  { value: "media", label: "Media & Press" },
] as const;

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
      name: "inquiryType",
      type: "select",
      options: inquiryTypes as unknown as Option[],
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
