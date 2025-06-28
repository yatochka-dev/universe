import {unstable_cacheLife, unstable_cacheTag} from "next/cache"
import payload from "."


export default async function getHeroSection() {
    "use cache"
    unstable_cacheTag("hero-section")
    unstable_cacheLife("hours")
    const p = await payload()
    return await p.findGlobal({ slug: "hero-section", draft: false })
}

export async function getHeroSectionDraft() {
    const p = await payload()
    return await p.findGlobal({ slug: "hero-section", draft: true })
}