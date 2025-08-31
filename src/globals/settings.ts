import type { GlobalConfig } from "payload";

export const GSettings: GlobalConfig = {
  slug: "settings",
  fields: [
    {
      name: "discord_community_url",
      type: "text",
      label: "Discord Community URL",
      required: true,
      defaultValue: "https://example.com",
    },
    {
      name: "discord_contact_notification_webhook_url",
      type: "text",
      label: "Discord Contact Notification Webhook URL",
      required: true,
      defaultValue: "https://example.com",
    },
    {
      type: "group",
      name: "direct_contact",
      label: "Direct Contact",
      fields: [
        {
          type: "text",
          name: "email",
          label: "Email",
          required: true,
        },
      ],
    },
    {
      type: "array",
      name: "socials",
      label: "Socials",
      fields: [
        {
          type: "checkbox",
          name: "show",
          label: "Show Social",
          defaultValue: true,
          required: true,
        },
        {
          type: "text",
          name: "name",
          label: "Name",
          defaultValue: "Twitter",
          required: true,
        },

        {
          name: "icon",
          type: "text", // we store the Lucide icon name
          required: true,
          defaultValue: "MessageCircle",
          admin: {
            description:
              "Pick a Lucide Icon (https://lucide.dev/icons/), stored as its name",
          },
        },
        {
          type: "text",
          name: "link",
          label: "Link",
          defaultValue: "https://example.com",
          required: true,
        },
      ],
    },
  ],
};
