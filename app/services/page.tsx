import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Services } from "@/components/sections/Services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI, computer vision, software, automation, research, and digital solutions from Opportunity Lens.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Services />
      </main>
      <Footer />
    </>
  );
}
