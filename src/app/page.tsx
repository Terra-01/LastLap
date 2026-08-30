import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Rigs } from "@/components/sections/Rigs";
import { Why } from "@/components/sections/Why";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { TheSpace } from "@/components/sections/TheSpace";
import { FAQ } from "@/components/sections/FAQ";
import { Waitlist } from "@/components/sections/Waitlist";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Rigs />
        <Why />
        <HowItWorks />
        <TheSpace />
        <FAQ />
        <Waitlist />
      </main>
      <Footer />
    </>
  );
}
