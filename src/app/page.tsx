import payload from "~/data-access";
import {RefreshRouteOnSave} from "~/app/rors";
import Hero from "~/components/hero-section";

export default async function HomePage() {
    const p = await payload()
    const config = await p.findGlobal({
        slug: "hero-section",
        draft: true,

    })
    return (
    <>
        <RefreshRouteOnSave/>
        <Hero/>
    </>
  );
}
