import sharp from "sharp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { buildConfig } from "payload";
import { Users } from "~/collections/User";
import { Contacts } from "~/collections/Contact";
import { GHeroSection } from "~/globals/hero";
import { GSettings } from "~/globals/settings";
import { env } from "./env";
import { GContactPage } from "~/globals/contact";

export default buildConfig({
  // If you'd like to use Rich Text, pass your editor here
  editor: lexicalEditor(),
  admin: {
    user: Users.slug,
    livePreview: {
      globals: ["hero-section", "contact-page"],
    },
  },
  // Define and configure your collections in this array
  collections: [Users, Contacts],
  globals: [GSettings, GHeroSection, GContactPage],

  // Your Payload secret - should be a complex and secure string, unguessable
  secret: process.env.PAYLOAD_SECRET ?? "",
  // Whichever Database Adapter you're using should go here
  // Mongoose is shown as an example, but you can also use Postgres
  db: postgresAdapter({
    pool: {
      connectionString: env.DATABASE_URL,
    },
  }),
  // If you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.
  // This is optional - if you don't need to do these things,
  // you don't need it!
  sharp,
});
