import type { Metadata } from "next";
import Adventure from "@/components/Adventure";

export const metadata: Metadata = {
  title: "Adventure",
  description:
    "Embark on a short D&D adventure — choose your character, roll dice, and face the dragon Malachar the Ancient.",
};

export default function AdventurePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <Adventure />
    </div>
  );
}
