import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useTasks } from "@/lib/tasks";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: "History — Aria" },
      { name: "description", content: "Tasks added over the last period." },
      { property: "og:title", content: "History — Aria" },
      { property: "og:description", content: "Recent task history." },
    ],
  }),
  component: HistoryPage,
});

function HistoryPage() {
  const { tasks } = useTasks();
  const [days, setDays] = useState(7);
  const filtered = useMemo(() => {
    const cutoff = Date.now() - days * 86400_000;
    return tasks
      .filter((t) => new Date(t.createdAt).getTime() >= cutoff)
      .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
  }, [tasks, days]);

  return (
    <div className="min-h-screen px-4 py-6 text-white" style={{ background: "#04122e" }}>
      <div className="mx-auto max-w-xl space-y-4">
        <h1 className="text-2xl font-semibold">History</h1>
        <div className="flex gap-2">
          {[7, 14, 30].map((d) => (
            <button
              key={d}
              onClick={() => setDays(d)}
              className={`rounded-full border px-3 py-1 text-sm ${
                days === d ? "border-sky-400 bg-sky-500/20" : "border-white/20"
              }`}
            >
              Last {d} days
            </button>
          ))}
        </div>
        <ul className="space-y-2">
          {filtered.map((t) => (
            <li key={t.id}>
              <Link
                to="/task/$id"
                params={{ id: t.id }}
                className="block rounded-xl border border-white/10 bg-white/[0.03] p-3"
              >
                <div className="flex justify-between">
                  <span>{t.title}</span>
                  <span className="text-xs text-white/60">
                    {new Date(t.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </Link>
            </li>
          ))}
          {filtered.length === 0 && <li className="text-sm text-white/60">No tasks in this range.</li>}
        </ul>
      </div>
    </div>
  );
}
