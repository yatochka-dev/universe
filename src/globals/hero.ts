/* <<<<<<<<<<<<<<  ✨ Windsurf Command ⭐ >>>>>>>>>>>>>>>> */
import type { GlobalConfig } from "payload";
import { revalidateTag } from "next/cache";
import { asterixValidator } from "~lib/asterixValidator";

export const GHeroSection: GlobalConfig = {
  slug: "hero-section",
  admin: {},
  versions: {
    drafts: {
      autosave: {
        interval: 250,
        showSaveDraftButton: false,
      },
      schedulePublish: true,
      validate: true,
    },
    max: 20,
  },
  fields: [
    {
      name: "topBadge",
      type: "group",
      label: "Top Badge",
      fields: [
        {
          name: "emoji",
          type: "text",
          minLength: 1,
          maxLength: 2,

          required: true,
          defaultValue: "🚀",
        },
        {
          name: "text",
          type: "text",
          required: true,
          defaultValue: "Join 1,100+ innovators worldwide",
        },
      ],
    },
    {
      name: "main",
      type: "group",
      label: "Main",
      admin: {
        position: "sidebar",
      },
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          defaultValue: "UniVerse",
        },
        {
          name: "subtitle",
          type: "text",
          required: true,
          admin: {
            description:
              "surround the work you want highlighted in red with **",
          },
          validate: asterixValidator,
          defaultValue: "Your *Launchpad* to Innovation",
        },
        {
          name: "paragraph",
          type: "text",
          required: true,
          validate: asterixValidator,
          defaultValue:
            "Empowering the next generation of builders, thinkers, and leaders through *hands-on learning* and *global collaboration*",
          admin: {
            description:
              "surround the work you want highlighted in red with **",
          },
        },
      ],
    },
    {
      type: "group",
      label: "Video Button",
      name: "video_button",
      fields: [
        {
          type: "checkbox",
          name: "show",
          label: "Show Video Button",
          defaultValue: true,
          required: true,
        },
        {
          type: "text",
          name: "url",
          label: "Video URL",
        },
        {
          type: "text",
          name: "text",
          label: "Button Text",
          defaultValue: "Watch Video",
        },
      ],
    },
    {
      type: "array",
      name: "stats",
      label: "Stats",
      required: true,
      fields: [
        {
          name: "value_number",
          type: "number",
          required: true,
          defaultValue: 0,
        },
        {
          name: "label",
          type: "text",
          required: true,
          defaultValue: "Countries",
        },
        {
          name: "isExact",
          type: "checkbox",
          defaultValue: false,
          admin: { description: "Removes + from the number if checked" },
        },
      ],
    },
  ],
};
