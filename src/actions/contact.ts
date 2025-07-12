"use server";

import { z } from "zod";
import { action } from "~/lib/safe-action";
import payloadClient from "~/data-access";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
});

export const submitContact = action
  .metadata()
  .inputSchema(schema)
  .action(async ({ parsedInput }) => {
    const payload = await payloadClient();
    await payload.create({ collection: "contacts", data: parsedInput });
    return { success: true };
  });
