import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { runAI } from "@/lib/ai.functions";
import { PageShell, Field, OutputPanel, PrimaryButton, inputCls } from "@/components/AIToolShell";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — Aria" },
      { name: "description", content: "Generate professional emails with tone and audience controls." },
      { property: "og:title", content: "Smart Email Generator — Aria" },
      { property: "og:description", content: "Draft polished emails in seconds." },
    ],
  }),
  component: EmailPage,
});

function EmailPage() {
  const generate = useServerFn(runAI);
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("Formal");
  const [audience, setAudience] = useState("Client");
  const [length, setLength] = useState("Medium");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  async function onGenerate() {
    if (!topic.trim()) {
      toast.error("Please describe what the email is about.");
      return;
    }
    setLoading(true);
    setOutput("");
    try {
      const system = `You are an expert business writer. Write a ${length.toLowerCase()}, ${tone.toLowerCase()} email addressed to a ${audience.toLowerCase()}. Return the email with a Subject line on the first line prefixed by "Subject:", then a blank line, then the body. Use natural, culturally neutral English. Do not include placeholders like [Name] unless information is missing; if so, mark them clearly in square brackets.`;
      const { content } = await generate({ data: { system, user: topic } });
      setOutput(content);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to generate email");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell
      eyebrow="Tool 01"
      title="Smart Email Generator"
      description="Describe what you need to say. Choose a tone and audience. Aria writes a polished, ready-to-send email."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="glass-card space-y-4 rounded-xl p-5">
          <Field label="What is the email about?" hint="Include key facts, names, and desired outcome.">
            <textarea
              className={inputCls + " min-h-[140px]"}
              placeholder="e.g. Follow up with Acme about the proposal we sent Tuesday and suggest a call next week."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </Field>
          <div className="grid grid-cols-3 gap-3">
            <Field label="Tone">
              <select className={inputCls} value={tone} onChange={(e) => setTone(e.target.value)}>
                {["Formal", "Friendly", "Persuasive", "Apologetic", "Direct"].map((t) => <option key={t}>{t}</option>)}
              </select>
            </Field>
            <Field label="Audience">
              <select className={inputCls} value={audience} onChange={(e) => setAudience(e.target.value)}>
                {["Client", "Manager", "Team", "Vendor", "Executive"].map((t) => <option key={t}>{t}</option>)}
              </select>
            </Field>
            <Field label="Length">
              <select className={inputCls} value={length} onChange={(e) => setLength(e.target.value)}>
                {["Short", "Medium", "Long"].map((t) => <option key={t}>{t}</option>)}
              </select>
            </Field>
          </div>
          <PrimaryButton onClick={onGenerate} loading={loading}>Generate email</PrimaryButton>
        </div>
        <OutputPanel content={output} loading={loading} />
      </div>
    </PageShell>
  );
}
