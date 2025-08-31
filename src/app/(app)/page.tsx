import Hero from "~/components/hero-section";
import { cookies } from "next/headers";
import { WhatWeDo } from "~/components/what-we-do";
import { WhyJoin } from "~/components/why-join";
import { FeaturedContent } from "~/components/featured-content";
import CallToAction from "~/components/call-to-action";

export default async function HomePage() {
  await cookies();
  return (
    <>
      <Hero d={false} />
      <WhatWeDo />
      <WhyJoin />
      <FeaturedContent />
      <CallToAction />
    </>
  );
}
