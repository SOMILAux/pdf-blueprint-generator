import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Help & Support — Aria" },
      { name: "description", content: "Get help using Aria." },
      { property: "og:title", content: "Help & Support — Aria" },
      { property: "og:description", content: "Guides and FAQs." },
    ],
  }),
  component: HelpPage,
});

const faqs = [
  { q: "How do I add a task?", a: "Tap the plus icon in the bottom navigation bar." },
  { q: "How do I mark a task complete?", a: "Open the task and tap 'Mark as completed'." },
  { q: "Where is my data stored?", a: "Only on your device — Aria does not use a database." },
  { q: "Can I change my onboarding answers?", a: "Yes, from Settings > Reset & restart." },
];

function HelpPage() {
  return (
    <div className="min-h-screen px-4 py-6 text-white" style={{ background: "#04122e" }}>
      <div className="mx-auto max-w-xl space-y-4">
        <h1 className="text-2xl font-semibold">Help & Support</h1>
        <ul className="space-y-3">
          {faqs.map((f) => (
            <li key={f.q} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="font-medium">{f.q}</p>
              <p className="mt-1 text-sm text-white/70">{f.a}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
