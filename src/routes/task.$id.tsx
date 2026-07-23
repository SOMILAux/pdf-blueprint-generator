import { createFileRoute, Link, useNavigate, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Calendar, Plus, Trash2, Sparkles, ArrowLeft, Check } from "lucide-react";
import { useTasks, type Task } from "@/lib/tasks";

export const Route = createFileRoute("/task/$id")({
  head: () => ({
    meta: [
      { title: "Task — Aria" },
      { name: "description", content: "Task detail view with status, priority and due date." },
      { property: "og:title", content: "Task — Aria" },
      { property: "og:description", content: "Aria task detail." },
    ],
  }),
  component: TaskDetail,
});

function TaskDetail() {
  const { id } = useParams({ from: "/task/$id" });
  const navigate = useNavigate();
  const { tasks, add, update, remove, toggle } = useTasks();
  const isNew = id === "new";
  const existing = tasks.find((t) => t.id === id);

  const [draft, setDraft] = useState<Partial<Task>>({
    title: "",
    description: "",
    priority: "low",
    dueAt: "",
  });

  useEffect(() => {
    if (existing) setDraft(existing);
  }, [existing?.id]);

  if (!isNew && !existing && tasks.length > 0) {
    return (
      <div className="min-h-screen px-6 py-20 text-center text-white" style={{ background: "#04122e" }}>
        <p>Task not found.</p>
        <Link to="/dashboard" className="mt-4 inline-block text-sky-400 underline">
          Back to dashboard
        </Link>
      </div>
    );
  }

  const save = () => {
    if (!draft.title) return;
    if (isNew) {
      add({
        title: draft.title!,
        description: draft.description,
        priority: (draft.priority as "high" | "low") ?? "low",
        dueAt: draft.dueAt || undefined,
      });
    } else {
      update(id, draft);
    }
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-screen pb-24" style={{ background: "#04122e" }}>
      <header className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
        <button onClick={() => navigate({ to: "/dashboard" })} className="text-white">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-semibold text-white">
          {isNew ? "Add task" : "Task details"}
        </h1>
      </header>

      <div className="mx-auto max-w-xl space-y-4 p-4">
        {isNew ? (
          <>
            <Field label="Title">
              <input
                value={draft.title ?? ""}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white"
              />
            </Field>
            <Field label="Description">
              <textarea
                rows={4}
                value={draft.description ?? ""}
                onChange={(e) => setDraft({ ...draft, description: e.target.value })}
                className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white"
              />
            </Field>
            <Field label="Priority">
              <select
                value={draft.priority as string}
                onChange={(e) => setDraft({ ...draft, priority: e.target.value as "high" | "low" })}
                className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white"
              >
                <option value="low">Low</option>
                <option value="high">High</option>
              </select>
            </Field>
            <Field label="Due date">
              <input
                type="date"
                value={draft.dueAt ? draft.dueAt.slice(0, 10) : ""}
                onChange={(e) =>
                  setDraft({ ...draft, dueAt: e.target.value ? new Date(e.target.value).toISOString() : "" })
                }
                className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white"
              />
            </Field>
            <button
              onClick={save}
              className="w-full rounded-xl py-3 text-white"
              style={{ background: "linear-gradient(135deg,#2354DE,#0172F2)" }}
            >
              Save task
            </button>
          </>
        ) : existing ? (
          <>
            <div className="rounded-2xl border border-white/15 bg-white/[0.03] p-5">
              <div className="flex items-center justify-between">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    existing.completed
                      ? "bg-emerald-500/20 text-emerald-300"
                      : "bg-amber-500/20 text-amber-300"
                  }`}
                >
                  {existing.completed ? "Completed" : "Pending"}
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    existing.priority === "high"
                      ? "bg-rose-500/20 text-rose-300"
                      : "bg-sky-500/20 text-sky-300"
                  }`}
                >
                  {existing.priority === "high" ? "High priority" : "Low priority"}
                </span>
              </div>
              <h2 className="mt-4 text-2xl font-semibold text-white">{existing.title}</h2>
              <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-white/70">
                <div>Added: {new Date(existing.createdAt).toLocaleDateString()}</div>
                <div>Due: {existing.dueAt ? new Date(existing.dueAt).toLocaleDateString() : "—"}</div>
              </div>
              <p className="mt-4 text-sm text-white/80">
                {existing.description || "No description."}
              </p>
              <button
                onClick={() => toggle(existing.id)}
                className="mt-4 inline-flex items-center gap-2 rounded-lg border border-white/20 px-3 py-2 text-sm text-white hover:bg-white/5"
              >
                <Check className="h-4 w-4" />
                Mark as {existing.completed ? "pending" : "completed"}
              </button>
            </div>
          </>
        ) : null}
      </div>

      {/* Bottom action bar */}
      <nav
        className="fixed bottom-16 left-0 right-0 z-30 border-t border-white/10 bg-[#050b1c]"
        style={{ height: 56 }}
      >
        <div className="mx-auto flex h-full max-w-xl items-center justify-around px-2 text-white">
          <button className="flex flex-col items-center text-[11px] text-white/80" onClick={() => navigate({ to: "/dashboard" })}>
            <Calendar className="h-5 w-5" />
            Calendar
          </button>
          <button className="flex flex-col items-center text-[11px] text-white/80" onClick={() => navigate({ to: "/task/$id", params: { id: "new" } })}>
            <Plus className="h-5 w-5" />
            Add
          </button>
          <button
            className="flex flex-col items-center text-[11px] text-rose-300 disabled:opacity-40"
            disabled={isNew || !existing}
            onClick={() => existing && (remove(existing.id), navigate({ to: "/dashboard" }))}
          >
            <Trash2 className="h-5 w-5" />
            Delete
          </button>
          <button className="flex flex-col items-center text-[11px] text-white/80" onClick={() => navigate({ to: "/tools" })}>
            <Sparkles className="h-5 w-5" />
            AI Tools
          </button>
        </div>
      </nav>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm text-white/70">{label}</span>
      {children}
    </label>
  );
}
