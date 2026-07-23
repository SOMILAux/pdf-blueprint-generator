import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useTasks } from "@/lib/tasks";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — Aria" },
      { name: "description", content: "Your Aria profile and preferences." },
      { property: "og:title", content: "Profile — Aria" },
      { property: "og:description", content: "Your profile." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { tasks } = useTasks();
  const [prefs, setPrefs] = useState<{ contexts: string[]; workflows: string[] } | null>(null);
  useEffect(() => {
    const raw = localStorage.getItem("aria.onboarded.v1");
    if (raw) try { setPrefs(JSON.parse(raw)); } catch {}
  }, []);

  const completed = tasks.filter((t) => t.completed).length;

  return (
    <div className="min-h-screen px-4 py-6 text-white" style={{ background: "#04122e" }}>
      <div className="mx-auto max-w-xl space-y-4">
        <div className="flex items-center gap-4">
          <div
            className="flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-semibold"
            style={{ background: "linear-gradient(135deg,#0b3d2e,#17a374)" }}
          >
            A
          </div>
          <div>
            <h1 className="text-2xl font-semibold">You</h1>
            <p className="text-sm text-white/60">Local profile · no account required</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Stat label="Total tasks" value={tasks.length} />
          <Stat label="Completed" value={completed} />
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <h2 className="font-medium">Your setup</h2>
          <p className="mt-1 text-xs uppercase tracking-wider text-white/50">Contexts</p>
          <p className="text-sm">{prefs?.contexts?.join(", ") || "—"}</p>
          <p className="mt-2 text-xs uppercase tracking-wider text-white/50">Workflows</p>
          <p className="text-sm">{prefs?.workflows?.join(", ") || "—"}</p>
          <Link
            to="/settings"
            className="mt-3 inline-block rounded-lg border border-white/20 px-3 py-1.5 text-sm hover:bg-white/5"
          >
            Manage settings
          </Link>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <p className="text-3xl font-semibold">{value}</p>
      <p className="text-xs text-white/60">{label}</p>
    </div>
  );
}
