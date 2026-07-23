import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { Flag } from "lucide-react";
import { useTasks } from "@/lib/tasks";

export const Route = createFileRoute("/priority")({
  head: () => ({
    meta: [
      { title: "Priority — Aria" },
      { name: "description", content: "Tasks ordered from highest to lowest priority." },
      { property: "og:title", content: "Priority — Aria" },
      { property: "og:description", content: "Focus on high-priority work." },
    ],
  }),
  component: PriorityPage,
});

function PriorityPage() {
  const { tasks } = useTasks();
  const sorted = useMemo(
    () =>
      [...tasks].sort((a, b) => {
        if (a.priority === b.priority) return +new Date(a.createdAt) - +new Date(b.createdAt);
        return a.priority === "high" ? -1 : 1;
      }),
    [tasks]
  );

  return (
    <div className="min-h-screen px-4 py-6 text-white" style={{ background: "#04122e" }}>
      <div className="mx-auto max-w-xl space-y-4">
        <h1 className="text-2xl font-semibold">Priority</h1>
        <ul className="space-y-2">
          {sorted.map((t) => (
            <li key={t.id}>
              <Link
                to="/task/$id"
                params={{ id: t.id }}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3"
              >
                <Flag
                  className={`h-4 w-4 ${t.priority === "high" ? "text-rose-400" : "text-sky-400"}`}
                />
                <span className="flex-1">{t.title}</span>
                <span className="text-xs uppercase tracking-wide text-white/60">{t.priority}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
