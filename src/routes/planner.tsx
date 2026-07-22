import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { runAI } from "@/lib/ai.functions";
import { PageShell, Field, OutputPanel, PrimaryButton, inputCls } from "@/components/AIToolShell";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "AI Task Planner — Aria" },
      { name: "description", content: "Get a prioritized daily or weekly plan with time blocks." },
      { property: "og:title", content: "AI Task Planner — Aria" },
      { property: "og:description", content: "Turn a task list into an optimized schedule." },
    ],
  }),
  component: PlannerPage,
});

function PlannerPage() {
  const generate = useServerFn(runAI);
  const [tasks, setTasks] = useState("");
  const [horizon, setHorizon] = useState("Day");
  const [hours, setHours] = useState("8");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  async function onGenerate() {
    if (!tasks.trim()) {
      toast.error("List at least a few tasks first.");
      return;
    }
    setLoading(true);
    setOutput("");
    try {
      const system = `You are a productivity coach. Build a ${horizon.toLowerCase()} plan for someone with ~${hours} focused working hours per day.
Use the Eisenhower matrix (urgent × important) to prioritize.
Return the plan as markdown:
## Priorities
- Ranked list with rationale
## Schedule
A table or bulleted time-block list with realistic durations and short breaks.
## Tips
2-3 concrete time-optimization suggestions.
Be realistic. Do not overload the day.`;
      const { content } = await generate({ data: { system, user: tasks } });
      setOutput(content);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to plan");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell
      eyebrow="Tool 03"
      title="AI Task Planner"
      description="Dump your tasks. Aria prioritizes them and builds a realistic time-blocked schedule."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass-card space-y-4 rounded-xl p-5">
          <Field label="Your tasks" hint="One per line. Add deadlines or context in parentheses.">
            <textarea
              className={inputCls + " min-h-[240px]"}
              placeholder={"Prepare quarterly report (due Friday)\nReview 3 PRs\nCall with vendor at 2pm\n…"}
              value={tasks}
              onChange={(e) => setTasks(e.target.value)}
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Plan horizon">
              <select className={inputCls} value={horizon} onChange={(e) => setHorizon(e.target.value)}>
                <option>Day</option><option>Week</option>
              </select>
            </Field>
            <Field label="Focus hours / day">
              <input className={inputCls} type="number" min={1} max={16} value={hours} onChange={(e) => setHours(e.target.value)} />
            </Field>
          </div>
          <PrimaryButton onClick={onGenerate} loading={loading}>Build plan</PrimaryButton>
        </div>
        <OutputPanel content={output} loading={loading} />
      </div>
    </PageShell>
  );
}
