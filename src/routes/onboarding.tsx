import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Check } from "lucide-react";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Set up Aria" },
      { name: "description", content: "Tell Aria where you'll use it and which workflows to speed up." },
      { property: "og:title", content: "Set up Aria" },
      { property: "og:description", content: "Personalize your AI workplace assistant." },
    ],
  }),
  component: Onboarding,
});

const placeOptions = ["Home", "Workplace", "School/Campus", "Other"];
const workflowOptions = [
  "Email generator",
  "Meeting Notes Summarizer",
  "Task Planner",
  "Schedule Planner",
  "Research Assistant",
];

function CheckboxRow({
  label,
  checked,
  onToggle,
}: {
  label: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-white transition-colors hover:bg-white/5"
    >
      <span
        className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border transition-colors"
        style={{
          background: checked ? "#007FFF" : "transparent",
          borderColor: checked ? "#007FFF" : "rgba(255,255,255,0.5)",
        }}
      >
        {checked && <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />}
      </span>
      <span className="text-[15px]">{label}</span>
    </button>
  );
}

function QuestionCard({ text }: { text: string }) {
  return (
    <div
      className="rounded-2xl border px-5 py-4"
      style={{
        borderColor: "rgba(255,255,255,0.35)",
        borderWidth: 1,
        background: "linear-gradient(135deg, #0a2a4a 0%, #0f4a3a 100%)",
      }}
    >
      <p
        className="text-white"
        style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 24, fontWeight: 500 }}
      >
        {text}
      </p>
    </div>
  );
}

function Onboarding() {
  const navigate = useNavigate();
  const [places, setPlaces] = useState<Set<string>>(new Set());
  const [flows, setFlows] = useState<Set<string>>(new Set());

  const toggle = (set: Set<string>, key: string, apply: (s: Set<string>) => void) => {
    const next = new Set(set);
    next.has(key) ? next.delete(key) : next.add(key);
    apply(next);
  };

  const submit = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("aria_onboarded", "1");
      localStorage.setItem("aria_places", JSON.stringify([...places]));
      localStorage.setItem("aria_flows", JSON.stringify([...flows]));
    }
    navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen px-5 py-10" style={{ background: "#0a1a3f" }}>
      <div className="mx-auto max-w-md space-y-6">
        <QuestionCard text="Where will you be using Aria assistant" />
        <div className="space-y-1 pl-1">
          {placeOptions.map((o) => (
            <CheckboxRow
              key={o}
              label={o}
              checked={places.has(o)}
              onToggle={() => toggle(places, o, setPlaces)}
            />
          ))}
        </div>

        <QuestionCard text="Which workflow do you want sped up" />
        <div className="space-y-1 pl-1">
          {workflowOptions.map((o) => (
            <CheckboxRow
              key={o}
              label={o}
              checked={flows.has(o)}
              onToggle={() => toggle(flows, o, setFlows)}
            />
          ))}
        </div>

        <button
          onClick={submit}
          className="mt-4 w-full rounded-xl py-3 text-white shadow-lg transition-transform hover:scale-[1.01]"
          style={{
            background: "linear-gradient(135deg, #2354DE 0%, #1550B9 50%, #0172F2 100%)",
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: 19,
            fontWeight: 600,
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
