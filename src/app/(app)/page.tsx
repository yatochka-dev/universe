import Hero from "~/components/hero-section";
import {cookies} from "next/headers";

export default async function HomePage() {
    await cookies()
    return (<>
        <Hero d={false}/>
    </>
  );
}
