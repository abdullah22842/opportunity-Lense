import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Research } from "@/components/sections/Research";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Applied research in generative AI, computer vision, and medical imaging at Opportunity Lens.",
  alternates: { canonical: "/research" },
};

export default function ResearchPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Research />
      </main>
      <Footer />
    </>
  );
}
