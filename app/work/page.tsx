import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Projects } from "@/components/sections/Projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected experiments, research, and technology projects from Opportunity Lens.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Projects />
      </main>
      <Footer />
    </>
  );
}
