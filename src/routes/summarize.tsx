import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { runAI } from "@/lib/ai.functions";
import { PageShell, Field, OutputPanel, PrimaryButton, inputCls } from "@/components/AIToolShell";

export const Route = createFileRoute("/summarize")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer — Aria" },
      { name: "description", content: "Turn raw meeting notes into a crisp summary with decisions and action items." },
      { property: "og:title", content: "Meeting Notes Summarizer — Aria" },
      { property: "og:description", content: "Extract key points, decisions, and deadlines from your notes." },
    ],
  }),
  component: SummarizePage,
});

function SummarizePage() {
  const generate = useServerFn(runAI);
  const [notes, setNotes] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  async function onGenerate() {
    if (notes.trim().length < 40) {
      toast.error("Paste at least a paragraph of notes.");
      return;
    }
    setLoading(true);
    setOutput("");
    try {
      const system = `You are an expert meeting analyst. Summarize the meeting notes into four sections using markdown headings:
## Summary
2-3 sentence overview.
## Key Decisions
Bulleted list.
## Action Items
Bulleted list. Each item: "- [Owner] Task — Deadline (if any)".
## Risks & Open Questions
Bulleted list, or "None identified".
Be faithful to the notes. Do not invent owners, dates, or facts. If information is missing, write "Not specified".`;
      const { content } = await generate({ data: { system, user: notes } });
      setOutput(content);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to summarize");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell
      eyebrow="Tool 02"
      title="Meeting Notes Summarizer"
      description="Paste raw notes or a transcript. Aria extracts decisions, action items, owners, and deadlines."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass-card space-y-4 rounded-xl p-5">
          <Field label="Meeting notes or transcript">
            <textarea
              className={inputCls + " min-h-[320px]"}
              placeholder="Paste your notes here…"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </Field>
          <PrimaryButton onClick={onGenerate} loading={loading}>Summarize</PrimaryButton>
        </div>
        <OutputPanel content={output} loading={loading} />
      </div>
    </PageShell>
  );
}
