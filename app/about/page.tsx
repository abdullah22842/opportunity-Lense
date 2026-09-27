import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { About } from "@/components/sections/About";
import { Why } from "@/components/sections/Why";

export const metadata: Metadata = {
  title: "About",
  description:
    "Opportunity Lens is a small team building practical AI, software, and research-driven technology.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <About />
        <Why />
      </main>
      <Footer />
    </>
  );
}
