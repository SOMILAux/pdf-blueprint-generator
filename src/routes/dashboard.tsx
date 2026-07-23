import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, User, Check, MessageCircle } from "lucide-react";
import { AriaSidebar } from "@/components/AriaSidebar";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Aria Dashboard" },
      { name: "description", content: "Your tasks, productivity, and AI tools in one place." },
      { property: "og:title", content: "Aria Dashboard" },
      { property: "og:description", content: "Your tasks, productivity, and AI tools in one place." },
    ],
  }),
  component: Dashboard,
});

const todayTasks = [
  { label: "Reply to design review email", done: true },
  { label: "Summarize Monday standup notes", done: true },
  { label: "Draft Q3 roadmap outline", done: false },
  { label: "Research competitor pricing", done: false },
];

const incompleteTasks = [
  { label: "Prepare onboarding deck", date: "Due Nov 24" },
  { label: "Send investor update", date: "Due Nov 25" },
  { label: "Review contract terms", date: "Due Nov 27" },
];

function ProgressRing({ percent, label, color }: { percent: number; label: string; color: string }) {
  const size = 130;
  const stroke = 12;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (percent / 100) * c;
  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(255,255,255,0.1)" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          fill="none"
        />
      </svg>
      <div className="-mt-[82px] flex h-[130px] w-[130px] items-center justify-center">
        <span className="text-2xl font-semibold text-white">{percent}%</span>
      </div>
      <p className="mt-2 text-center text-xs text-white/70">{label}</p>
    </div>
  );
}

function Dashboard() {
  const [sidebar, setSidebar] = useState(false);

  return (
    <div className="min-h-screen pb-24" style={{ background: "#0a1a3f" }}>
      <AriaSidebar open={sidebar} onClose={() => setSidebar(false)} />

      {/* top bar, height 56 */}
      <header
        className="sticky top-0 z-30 flex items-center gap-2 border-b border-white/10 bg-[#0b1230]/95 px-3 backdrop-blur-xl"
        style={{ height: 56 }}
      >
        <button
          onClick={() => setSidebar(true)}
          className="flex items-center gap-2"
          aria-label="Open menu"
        >
          <div className="h-8 w-8 rounded-lg" style={{ background: "linear-gradient(135deg,#2354DE,#0f4a3a)" }} />
          <span className="text-base font-semibold text-white" style={{ fontFamily: "Sono, sans-serif" }}>
            Aria
          </span>
        </button>

        <div className="mx-2 flex flex-1 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3" style={{ height: 36 }}>
          <Search className="h-4 w-4 text-white/60" />
          <input
            placeholder="Search tasks & AI tools"
            className="w-full bg-transparent text-sm text-white placeholder:text-white/50 focus:outline-none"
          />
        </div>

        <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white">
          <User className="h-4 w-4" />
        </button>
      </header>

      <main className="mx-auto max-w-md space-y-6 px-4 py-8">
        <h1
          className="text-center text-white"
          style={{ fontFamily: "Sono, sans-serif", fontSize: 55, fontWeight: 600, lineHeight: 1 }}
        >
          Welcome
        </h1>

        {/* Tasks for today */}
        <section
          className="rounded-2xl border border-white/15 p-5"
          style={{ background: "linear-gradient(160deg,#0f2a4a,#0a1a3f)" }}
        >
          <h2
            className="mb-4 text-center text-white"
            style={{ fontFamily: "Inter, sans-serif", fontSize: 28, fontWeight: 700 }}
          >
            Tasks for today
          </h2>
          <ul className="space-y-3">
            {todayTasks.map((t) => (
              <li key={t.label} className="flex items-center gap-3">
                {t.done ? (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500">
                    <Check className="h-3 w-3 text-white" strokeWidth={3} />
                  </span>
                ) : (
                  <span className="h-5 w-5 rounded-full border border-white/40" />
                )}
                <span
                  className={`text-white ${t.done ? "line-through opacity-60" : ""}`}
                  style={{ fontFamily: "Inter, sans-serif", fontSize: 18 }}
                >
                  {t.label}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Incomplete tasks */}
        <section
          className="rounded-2xl border border-white/15 p-5"
          style={{ background: "linear-gradient(160deg,#0f2a4a,#0a1a3f)" }}
        >
          <h2
            className="mb-4 text-center text-white"
            style={{ fontFamily: "Inter, sans-serif", fontSize: 28, fontWeight: 700 }}
          >
            Incomplete tasks
          </h2>
          <ul className="space-y-3">
            {incompleteTasks.map((t) => (
              <li key={t.label} className="flex items-center justify-between gap-3">
                <span className="text-white" style={{ fontFamily: "Inter, sans-serif", fontSize: 18 }}>
                  {t.label}
                </span>
                <span className="text-xs text-white/60">{t.date}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Rings */}
        <section
          className="rounded-2xl border border-white/15 p-5"
          style={{ background: "linear-gradient(160deg,#0f2a4a,#0a1a3f)" }}
        >
          <div className="flex items-center justify-around">
            <ProgressRing percent={72} label="Today's productivity" color="#2354DE" />
            <ProgressRing percent={50} label="Tasks completed today" color="#0f4a3a" />
          </div>
        </section>

        <section className="grid grid-cols-2 gap-3">
          {[
            { to: "/email", label: "Email" },
            { to: "/summarize", label: "Summarize" },
            { to: "/planner", label: "Planner" },
            { to: "/research", label: "Research" },
          ].map((s) => (
            <Link
              key={s.to}
              to={s.to}
              className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white hover:bg-white/10"
            >
              {s.label}
            </Link>
          ))}
        </section>
      </main>

      {/* Chat FAB */}
      <Link
        to="/chat"
        className="fixed bottom-20 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full shadow-2xl"
        style={{ background: "linear-gradient(135deg,#2354DE,#0f4a3a)" }}
        aria-label="Open Aria chat"
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </Link>
    </div>
  );
}
