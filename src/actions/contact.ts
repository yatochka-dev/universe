"use server";

import { z } from "zod";
import { action } from "~/lib/safe-action";
import payloadClient from "~/data-access";
import { inquiryTypes } from "~/collections/Contact";
import { flattenValidationErrors } from "next-safe-action";

const schema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    inquiryType: z.enum(
        inquiryTypes.map((i) => i.value) as [string, ...string[]],
    ),
    message: z.string().min(1),
});

export const submitContact = action
    .inputSchema(schema, {
        handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve),
    })
    .action(async ({ parsedInput }) => {
        const payload = await payloadClient();

        return await payload.create({
            collection: "contacts",
            data: {
                ...parsedInput,
                inquiryType:
                    parsedInput.inquiryType as (typeof inquiryTypes)[number]["value"],
            },
        });
    });
