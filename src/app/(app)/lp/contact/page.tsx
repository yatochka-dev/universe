import React from "react";
import Contact from "../../contact/contact";
import { getContactPageDraft } from "~/data-access/contact";
import { cookies } from "next/headers";

export default async function ContactPage() {
  await cookies();
  const data = await getContactPageDraft();
  return <Contact contact={data} />;
}
