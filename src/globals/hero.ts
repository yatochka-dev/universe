/* <<<<<<<<<<<<<<  ✨ Windsurf Command ⭐ >>>>>>>>>>>>>>>> */
import type { GlobalConfig } from "payload";
import { revalidateTag } from "next/cache";
import { asterixValidator } from "../lib/asterixValidator";
import { env } from "~/env";

export const GHeroSection: GlobalConfig = {
  slug: "hero-section",
  admin: {
    livePreview: {
      url: `${env.NEXT_PUBLIC_VERCEL_BRANCH_URL}/lp/`,
    },
  },
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
      name: "icon",
      type: "text", // we store the Lucide icon name
      admin: {
        description: "Pick a Lucide icon (stored as its name)",
        components: {
          Field: {
            path: "/src/fields/IconPicker", // or relative to admin.importMap.baseDir
            exportName: "default",
            clientProps: {
              // optional: restrict to a curated subset
              // allow: ['User', 'Mail', 'Calendar'] as const
            },
          },
        },
      },
    },
    {
      name: "topBadge",
      type: "group",
      label: "Top Badge",
      fields: [
        {
          name: "Icon",
          type: "text",

          required: true,
        },
        {
          name: "link",
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
              "surround the word you want highlighted in red with **",
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
              "surround the word you want highlighted in red with **",
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
