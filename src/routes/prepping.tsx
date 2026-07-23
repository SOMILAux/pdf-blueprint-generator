import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Check } from "lucide-react";

export const Route = createFileRoute("/prepping")({
  head: () => ({
    meta: [
      { title: "Set up Aria" },
      { name: "description", content: "Tell Aria where you'll use it and which workflows to speed up." },
      { property: "og:title", content: "Set up Aria" },
      { property: "og:description", content: "Personalize Aria in two quick questions." },
    ],
  }),
  component: Prepping,
});

const contexts = ["Home", "Workplace", "School/Campus", "Other"];
const workflows = [
  "Email Generator",
  "Meeting Notes Summarizer",
  "Task Planner",
  "Schedule Planner",
  "Research Assistant",
];

function Prepping() {
  const navigate = useNavigate();
  const [ctx, setCtx] = useState<Set<string>>(new Set());
  const [wf, setWf] = useState<Set<string>>(new Set());

  const toggle = (set: Set<string>, setter: (s: Set<string>) => void, v: string) => {
    const next = new Set(set);
    next.has(v) ? next.delete(v) : next.add(v);
    setter(next);
  };

  const submit = () => {
    localStorage.setItem(
      "aria.onboarded.v1",
      JSON.stringify({ contexts: [...ctx], workflows: [...wf] })
    );
    navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen px-5 py-10" style={{ background: "#04122e" }}>
      <div className="mx-auto max-w-xl space-y-8">
        <QuestionBlock
          title="Where will you be using Aria assistant"
          options={contexts}
          selected={ctx}
          onToggle={(v) => toggle(ctx, setCtx, v)}
        />
        <QuestionBlock
          title="Which workflow do you want sped up"
          options={workflows}
          selected={wf}
          onToggle={(v) => toggle(wf, setWf, v)}
        />
        <button
          onClick={submit}
          className="w-full rounded-2xl py-4 text-white shadow-lg transition-transform hover:scale-[1.01]"
          style={{
            background: "linear-gradient(135deg, #2354DE 0%, #1550B9 50%, #0172F2 100%)",
            fontFamily: "Inter, sans-serif",
            fontSize: 19,
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

function QuestionBlock({
  title,
  options,
  selected,
  onToggle,
}: {
  title: string;
  options: string[];
  selected: Set<string>;
  onToggle: (v: string) => void;
}) {
  return (
    <div className="space-y-3">
      <div
        className="rounded-2xl border border-white/40 px-5 py-4"
        style={{
          background: "linear-gradient(135deg, #04070F 0%, #0b3d2e 60%, #17a374 100%)",
        }}
      >
        <h2
          className="text-white"
          style={{ fontFamily: "Inter, sans-serif", fontSize: 24, fontWeight: 500 }}
        >
          {title}
        </h2>
      </div>
      <ul className="space-y-2 pl-1">
        {options.map((o) => {
          const on = selected.has(o);
          return (
            <li key={o}>
              <button
                onClick={() => onToggle(o)}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-white/90 hover:bg-white/5"
              >
                <span
                  className="flex h-5 w-5 items-center justify-center rounded border transition-colors"
                  style={{
                    borderColor: on ? "#007FFF" : "rgba(255,255,255,0.6)",
                    background: on ? "#007FFF" : "#04122e",
                  }}
                >
                  {on && <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />}
                </span>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 16 }}>{o}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
