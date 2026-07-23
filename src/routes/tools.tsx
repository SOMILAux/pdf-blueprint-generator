import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, FileText, CalendarCheck, Search, MessagesSquare } from "lucide-react";

export const Route = createFileRoute("/tools")({
  head: () => ({
    meta: [
      { title: "AI Tools — Aria" },
      { name: "description", content: "Every Aria AI tool in one place." },
      { property: "og:title", content: "AI Tools — Aria" },
      { property: "og:description", content: "Email, summaries, planning, research, and chat." },
    ],
  }),
  component: ToolsPage,
});

const tools = [
  { to: "/email", icon: Mail, title: "Email Generator", desc: "Draft professional emails." },
  { to: "/summarize", icon: FileText, title: "Meeting Summarizer", desc: "Notes → decisions & actions." },
  { to: "/planner", icon: CalendarCheck, title: "Task Planner", desc: "Prioritized plans." },
  { to: "/research", icon: Search, title: "Research Assistant", desc: "Summarize any topic." },
  { to: "/chat", icon: MessagesSquare, title: "AI Chat", desc: "Ask anything." },
] as const;

function ToolsPage() {
  return (
    <div className="min-h-screen px-4 py-6 text-white" style={{ background: "#04122e" }}>
      <div className="mx-auto max-w-xl space-y-4">
        <h1 className="text-2xl font-semibold">AI Tools</h1>
        <div className="grid gap-3 sm:grid-cols-2">
          {tools.map((t) => (
            <Link
              key={t.to}
              to={t.to}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 hover:border-sky-400/40"
            >
              <div
                className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg"
                style={{ background: "linear-gradient(135deg,#0b3d2e,#17a374)" }}
              >
                <t.icon className="h-5 w-5 text-white" />
              </div>
              <h2 className="font-semibold">{t.title}</h2>
              <p className="text-sm text-white/60">{t.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
