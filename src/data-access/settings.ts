import payload from "."


export default async function getSettings() {
    const p = await payload()
    return await p.findGlobal({ slug: "settings" })
}