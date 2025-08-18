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
  ],
};
