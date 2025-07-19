import type { CollectionConfig, Option } from "payload";
import { sendWebhook, WebhookPayloadBuilder } from "~/lib/discordWebhook";
import { env } from "~/env";
import type { Contact } from "../../payload-types";
import payload from "~/data-access";

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
      async ({ doc, operation, req }) => {
        if (operation === "create") {
          const p = await payload();

          const obj = doc as Contact;
          let whp = WebhookPayloadBuilder.create()
            .username("Contact Request Notifier")
            .avatar("https://universe-gamma-three.vercel.app/favicon-32x32.png")
            .content("@here")
            .addEmbed({
              color: 0xff0000,
              title: `Someone contacted you! `,
              fields: [
                {
                  name: "Name",
                  value: `${obj.name}`,
                  inline: true,
                },
                {
                  name: "Email",
                  value: obj.email,
                  inline: true,
                },
                {
                  name: "Inquiry Type",
                  value: obj.inquiryType,
                  inline: true,
                },
                {
                  name: "Contact Message",
                  value: obj.message,
                },
                {
                  name: "Link to the Admin Panel",
                  value:
                    env.NEXT_PUBLIC_VERCEL_BRANCH_URL +
                    `/admin/collections/contacts/${obj.id}`,
                },
              ],
            });

          if (env.NODE_ENV === "production")
            whp = whp.allowMentions({ parse: ["everyone"] });

          const global = await p.findGlobal({
            slug: "settings",
            req: req,
          });

          await sendWebhook(
            global.discord_contact_notification_webhook_url,
            whp.build(),
          );
        }
      },
    ],
  },
};

export default Contacts;
