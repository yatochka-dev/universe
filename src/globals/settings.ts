import type { GlobalConfig } from "payload";

export const GSettings: GlobalConfig = {
  slug: "settings",
  fields: [
    {
      name: "discord_community_url",
      type: "text",
      label: "Discord Community URL",
      required: true,
    },
  ],
};
