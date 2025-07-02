"use cache"
import Hero from "~/components/hero-section";
import {unstable_cacheLife} from "next/cache";

export default async function HomePage() {
    unstable_cacheLife("days")
    return (
    <>
        <Hero d={false}/>
    </>
  );
}
