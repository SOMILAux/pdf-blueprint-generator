import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, User, Menu, MessagesSquare, Check } from "lucide-react";
import { useTasks } from "@/lib/tasks";
import { Sidebar } from "@/components/Sidebar";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Aria" },
      { name: "description", content: "Your Aria dashboard: today's tasks, productivity, and AI tools." },
      { property: "og:title", content: "Aria Dashboard" },
      { property: "og:description", content: "Track tasks and productivity at a glance." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { tasks } = useTasks();
  const [sidebar, setSidebar] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const filtered = useMemo(
    () => tasks.filter((t) => t.title.toLowerCase().includes(q.toLowerCase())),
    [tasks, q]
  );
  const completed = filtered.filter((t) => t.completed);
  const incomplete = filtered.filter((t) => !t.completed);

  const productivity = tasks.length
    ? Math.round((tasks.filter((t) => t.completed).length / tasks.length) * 100)
    : 0;
  const todayPct = productivity;

  return (
    <div className="min-h-screen" style={{ background: "#04122e" }}>
      <Sidebar open={sidebar} onClose={() => setSidebar(false)} />

      {/* Top bar */}
      <header
        className="sticky top-0 z-30 flex items-center gap-3 border-b border-white/10 px-3"
        style={{ height: 56, background: "#050b1c" }}
      >
        <button onClick={() => setSidebar(true)} className="flex items-center gap-2 text-white">
          <div
            className="h-8 w-8 rounded-lg"
            style={{ background: "linear-gradient(135deg,#0b3d2e,#17a374)" }}
          />
          <span style={{ fontFamily: "Sono, monospace", fontWeight: 300 }} className="text-lg">
            Aria
          </span>
          <Menu className="ml-1 h-4 w-4 text-white/60" />
        </button>
        <div className="flex flex-1 items-center gap-2 rounded-full bg-white/10 px-3">
          <Search className="h-4 w-4 text-white/60" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search tasks or AI tools"
            className="w-full bg-transparent py-2 text-sm text-white placeholder:text-white/50 focus:outline-none"
          />
        </div>
        <Link to="/profile" className="rounded-full bg-white/10 p-2 text-white">
          <User className="h-5 w-5" />
        </Link>
      </header>

      <div className="mx-auto max-w-xl space-y-6 px-4 py-6">
        <h1
          className="text-center text-white"
          style={{ fontFamily: "Sono, monospace", fontWeight: 600, fontSize: 55, lineHeight: 1.1 }}
        >
          Welcome
        </h1>

        <Frame title="Tasks for today">
          <ul className="space-y-3">
            {completed.length === 0 && (
              <li className="text-sm text-white/50">No completed tasks yet.</li>
            )}
            {completed.map((t) => (
              <li key={t.id}>
                <Link
                  to="/task/$id"
                  params={{ id: t.id }}
                  className="flex items-center gap-3 rounded-lg px-2 py-1.5 hover:bg-white/5"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500">
                    <Check className="h-4 w-4 text-white" strokeWidth={3} />
                  </span>
                  <span
                    className="flex-1 text-white line-through decoration-white/40"
                    style={{ fontFamily: "Inter, sans-serif", fontSize: 18 }}
                  >
                    {t.title}
                  </span>
                </Link>
              </li>
            ))}
            {incomplete.slice(0, 3).map((t) => (
              <li key={t.id}>
                <Link
                  to="/task/$id"
                  params={{ id: t.id }}
                  className="flex items-center gap-3 rounded-lg px-2 py-1.5 hover:bg-white/5"
                >
                  <span className="h-6 w-6 rounded-full border-2 border-white/40" />
                  <span
                    className="flex-1 text-white"
                    style={{ fontFamily: "Inter, sans-serif", fontSize: 18 }}
                  >
                    {t.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Frame>

        <Frame title="Incomplete tasks">
          <ul className="space-y-3">
            {incomplete.length === 0 && (
              <li className="text-sm text-white/50">Nothing pending — nice.</li>
            )}
            {incomplete.map((t) => (
              <li key={t.id}>
                <Link
                  to="/task/$id"
                  params={{ id: t.id }}
                  className="flex items-center justify-between rounded-lg px-2 py-1.5 hover:bg-white/5"
                >
                  <span
                    className="text-white"
                    style={{ fontFamily: "Inter, sans-serif", fontSize: 18 }}
                  >
                    {t.title}
                  </span>
                  {t.dueAt && (
                    <span className="text-xs text-white/60">
                      Due {new Date(t.dueAt).toLocaleDateString()}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </Frame>

        <div className="grid grid-cols-2 gap-4">
          <StatCircle label="Today's productivity" value={todayPct} color="#17a374" />
          <StatCircle
            label="Tasks completed"
            value={tasks.length ? Math.round((completed.length / tasks.length) * 100) : 0}
            color="#0172F2"
          />
        </div>
      </div>

      {/* Chatbot FAB */}
      <button
        onClick={() => navigate({ to: "/chat" })}
        aria-label="Open chatbot"
        className="fixed bottom-20 right-4 z-30 flex h-14 w-14 items-center justify-center rounded-2xl shadow-2xl"
        style={{ background: "linear-gradient(135deg,#0b3d2e,#17a374)" }}
      >
        <MessagesSquare className="h-6 w-6 text-white" />
      </button>
    </div>
  );
}

function Frame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-white/15 bg-white/[0.03] p-4">
      <h2
        className="mb-4 text-center text-white"
        style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 28 }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

function StatCircle({ label, value, color }: { label: string; value: number; color: string }) {
  const r = 42;
  const c = 2 * Math.PI * r;
  const dash = (value / 100) * c;
  return (
    <div className="rounded-2xl border border-white/15 bg-white/[0.03] p-4">
      <div className="mx-auto flex h-32 w-32 items-center justify-center">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle cx="50" cy="50" r={r} stroke="rgba(255,255,255,0.1)" strokeWidth="10" fill="none" />
          <circle
            cx="50"
            cy="50"
            r={r}
            stroke={color}
            strokeWidth="10"
            fill="none"
            strokeDasharray={`${dash} ${c}`}
            strokeLinecap="round"
          />
          <text
            x="50"
            y="55"
            textAnchor="middle"
            transform="rotate(90 50 50)"
            fill="white"
            style={{ fontFamily: "Sono, monospace", fontSize: 20, fontWeight: 600 }}
          >
            {value}%
          </text>
        </svg>
      </div>
      <p className="mt-2 text-center text-xs text-white/70">{label}</p>
    </div>
  );
}
