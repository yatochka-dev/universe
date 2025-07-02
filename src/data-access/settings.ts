import payload from "~/data-access";

export default async function getSettings() {
  const p = await payload();
  return await p.findGlobal({ slug: "settings" });
}
