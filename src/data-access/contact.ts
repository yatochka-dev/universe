import payload from ".";

export default async function getContactPage() {
  const p = await payload();
  return await p.findGlobal({ slug: "contact-page", draft: false });
}

export async function getContactPageDraft() {
  const p = await payload();
  return await p.findGlobal({ slug: "contact-page", draft: true });
}
