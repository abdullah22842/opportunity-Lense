import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Research } from "@/components/sections/Research";
import { Projects } from "@/components/sections/Projects";
import { About } from "@/components/sections/About";
import { Why } from "@/components/sections/Why";
import { Insights } from "@/components/sections/Insights";
import { FinalCta } from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Services />
        <Research />
        <Projects />
        <About />
        <Why />
        <Insights />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
