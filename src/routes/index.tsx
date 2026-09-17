import { createFileRoute } from "@tanstack/react-router";
import { Dashboard } from "@/components/dashboard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Portfolio Tracker" },
      {
        name: "description",
        content: "Portfolio Tracker",
      },
      { property: "og:title", content: "Portfolio Tracker" },
      {
        property: "og:description",
        content: "Portfolio Tracker",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});
