import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { runAI } from "@/lib/ai.functions";
import { PageShell, Field, OutputPanel, PrimaryButton, inputCls } from "@/components/AIToolShell";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant — Aria" },
      { name: "description", content: "Summarize topics, articles, or reports with key insights and recommendations." },
      { property: "og:title", content: "AI Research Assistant — Aria" },
      { property: "og:description", content: "Fast, structured research briefs." },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  const generate = useServerFn(runAI);
  const [input, setInput] = useState("");
  const [depth, setDepth] = useState("Overview");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  async function onGenerate() {
    if (!input.trim()) {
      toast.error("Enter a topic or paste text to research.");
      return;
    }
    setLoading(true);
    setOutput("");
    try {
      const system = `You are a senior research analyst. Produce a ${depth.toLowerCase()} brief for a busy professional. Structure:
## TL;DR
3 bullet takeaways.
## Background
2-4 sentences.
## Key Insights
5-7 bullets. Prefer concrete, verifiable claims.
## Recommendations
3 actionable next steps.
## Caveats
Note what you are unsure about or what should be verified.
If the user pasted an article, base the brief on that text only. If the user gave a topic, use general knowledge but flag anything that may be outdated. Do not fabricate citations or statistics.`;
      const { content } = await generate({ data: { system, user: input } });
      setOutput(content);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to research");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell
      eyebrow="Tool 04"
      title="AI Research Assistant"
      description="Give Aria a topic or paste an article. Get a structured brief with insights and recommendations."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass-card space-y-4 rounded-xl p-5">
          <Field label="Topic or pasted text">
            <textarea
              className={inputCls + " min-h-[240px]"}
              placeholder="e.g. What are the risks of adopting generative AI in HR workflows?"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </Field>
          <Field label="Depth">
            <select className={inputCls} value={depth} onChange={(e) => setDepth(e.target.value)}>
              <option>Overview</option>
              <option>Detailed</option>
              <option>Executive</option>
            </select>
          </Field>
          <PrimaryButton onClick={onGenerate} loading={loading}>Research</PrimaryButton>
        </div>
        <OutputPanel content={output} loading={loading} />
      </div>
    </PageShell>
  );
}
