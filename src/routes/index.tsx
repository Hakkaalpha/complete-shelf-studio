import { createFileRoute } from "@tanstack/react-router";
import { ResumeShelfLandingPage } from "../shaders/landing-pages/LandingPages";
import "../shaders/threeui.css";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tushar Yadav — C++, AI & Linux Engineer" },
      {
        name: "description",
        content:
          "Interactive résumé of Tushar Yadav: software engineer with mastery in C++ and AI and deep Linux experience. Browse the shelf, open a volume, download the résumé.",
      },
      { property: "og:title", content: "Tushar Yadav — C++, AI & Linux Engineer" },
      {
        property: "og:description",
        content: "An interactive bookshelf résumé. Seven volumes covering C++, AI, Linux, projects, experience and contact.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="fixed inset-0">
      <h1 className="sr-only">Tushar Yadav — Résumé</h1>
      <ResumeShelfLandingPage style={{ width: "100%", height: "100%" }} />
    </main>
  );
}
