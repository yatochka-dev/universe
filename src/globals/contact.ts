/* <<<<<<<<<<<<<<  ✨ Windsurf Command ⭐ >>>>>>>>>>>>>>>> */
import type { GlobalConfig } from "payload";
import { revalidateTag } from "next/cache";
import { asterixValidator } from "../lib/asterixValidator";
import { env } from "~/env";

export const GContactPage: GlobalConfig = {
  slug: "contact-page",
  admin: {
    livePreview: {
      url: `${env.NEXT_PUBLIC_VERCEL_BRANCH_URL}/lp/contact`,
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
      type: "text",
      name: "title",
      label: "Title",
      required: true,
    },
    {
      type: "text",
      name: "subtitle",
      label: "subtitle",
      required: true,
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

    {
      type: "group",
      name: "faq",
      label: "FAQ",

      fields: [
        {
          type: "checkbox",
          name: "show",
          label: "Show FAQ",
          defaultValue: true,
          required: true,
        },
        {
          type: "array",
          name: "questions",
          label: "Questions",
          fields: [
            { type: "text", name: "question" },
            { type: "text", name: "answer" },
          ],
        },
      ],
    },
  ],
};
