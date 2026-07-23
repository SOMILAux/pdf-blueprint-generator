import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, FileText, CalendarCheck, Search, MessagesSquare, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aria — AI Workplace Productivity Assistant" },
      { name: "description", content: "Automate drafting, summarizing, planning, and research. Five AI tools built for busy professionals." },
      { property: "og:title", content: "Aria — Your AI Workplace Assistant" },
      { property: "og:description", content: "Draft emails, summarize meetings, plan days, research topics, and chat with an AI copilot." },
    ],
  }),
  component: Index,
});

const tools = [
  { to: "/email", icon: Mail, title: "Smart Email Generator", desc: "Draft professional emails with tone and audience controls." },
  { to: "/summarize", icon: FileText, title: "Meeting Notes Summarizer", desc: "Turn raw notes into decisions, action items, and deadlines." },
  { to: "/planner", icon: CalendarCheck, title: "AI Task Planner", desc: "Get a prioritized daily or weekly plan with time blocks." },
  { to: "/research", icon: Search, title: "Research Assistant", desc: "Summarize topics with key insights and recommendations." },
  { to: "/chat", icon: MessagesSquare, title: "AI Chat Assistant", desc: "Conversational copilot for any workplace question." },
] as const;

function Index() {
  return (
    <div>
      <section className="relative overflow-hidden px-6 pt-20 pb-16">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            AI Skill Accelerator Project · CAPACITI
          </div>
          <h1 className="text-5xl font-bold leading-[1.05] md:text-7xl">
            Your AI copilot for{" "}
            <span className="gradient-text">workplace productivity</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Aria automates the repetitive parts of your day — drafting emails, summarizing meetings,
            planning tasks, and researching topics — so you can focus on the work that matters.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/chat"
              className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-[1.03]"
              style={{ background: "var(--gradient-hero)", boxShadow: "var(--shadow-glow)" }}
            >
              Try the assistant
            </Link>
            <Link
              to="/email"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-6 py-3 text-sm font-semibold hover:bg-secondary/70"
            >
              Explore tools
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">Five tools, one assistant</h2>
            <p className="mt-1 text-sm text-muted-foreground">Pick the workflow you want to speed up.</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => (
            <Link
              key={t.to}
              to={t.to}
              className="glass-card group relative overflow-hidden rounded-2xl p-6 transition-all hover:-translate-y-1 hover:border-primary/50"
            >
              <div
                className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg text-primary-foreground"
                style={{ background: "var(--gradient-hero)" }}
              >
                <t.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold">{t.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>
              <span className="mt-4 inline-block text-xs font-medium text-accent group-hover:underline">
                Open tool →
              </span>
            </Link>
          ))}
        </div>

        <div className="glass-card mt-10 rounded-2xl p-6 md:p-8">
          <h3 className="text-lg font-semibold">Built with responsible AI in mind</h3>
          <ul className="mt-3 grid gap-2 text-sm text-muted-foreground md:grid-cols-2">
            <li>• Every output includes a review-before-use reminder.</li>
            <li>• Carefully engineered prompts for clarity and tone.</li>
            <li>• Sensitive advice defers to qualified experts.</li>
            <li>• No user data is stored — inputs go directly to the model.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
