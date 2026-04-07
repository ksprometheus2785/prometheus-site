import { HomeHero } from "@/components/sections/HomeHero";
import { HomeSections } from "@/components/sections/HomeSections";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <main>
      <HomeHero />
      <HomeSections />
    </main>
  );
}
