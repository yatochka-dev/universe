import payload from "."


export default async function getHeroSection() {
    const p = await payload()
    return await p.findGlobal({ slug: "hero-section", draft: false })
}

export async function getHeroSectionDraft() {
    const p = await payload()
    return await p.findGlobal({ slug: "hero-section", draft: true })
}