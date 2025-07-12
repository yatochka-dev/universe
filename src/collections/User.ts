import type { CollectionConfig } from "payload";
import { z } from "zod";
import { isSudo, isSudoF } from "~/access/sudo";
import { env } from "~/env";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "username",
  },
  access: {
    admin: ({ req }) => {
      if (!req.user?.isAdmin) return isSudo({ req }) as boolean;
      return req?.user?.isAdmin as boolean;
    },
  },
  auth: true,
  fields: [
    {
      name: "email",
      type: "email",
      required: true,
      unique: true,
      access: {
        update: () => false,
        create: () => true,
        read: () => true,
      },
    },
    {
      name: "name",
      type: "text",
      required: true,
      defaultValue: "Stealthy User",
      admin: {
        position: "sidebar",
      },
    },

    {
      name: "username",
      type: "text",
      required: true,
      defaultValue: "stealthyuser",
      minLength: 3,
      maxLength: 50,
      unique: true,
      admin: {
        position: "sidebar",
      },
      validate: (value: unknown) => {
        const schema = z
          .string()
          .min(3)
          .max(50)
          .regex(/^[a-z0-9_-]+$/);

        const result = schema.safeParse(value);

        if (!result.success) {
          return result.error.issues[0]?.message ?? "Invalid username";
        }

        return true;
      },
    },

    {
      name: "isAdmin",
      type: "checkbox",
      saveToJWT: true,
      defaultValue: false,
      required: true,
      admin: {
        position: "sidebar",
      },
      access: {
        update: isSudoF,
        create: isSudoF,
      },
    },

    // Email added by default
    // Add more fields as needed
  ],
};
