import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { runChat } from "@/lib/ai.functions";
import { inputCls } from "@/components/AIToolShell";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI Chat Assistant — Aria" },
      { name: "description", content: "Chat with Aria, your AI workplace copilot for any question." },
      { property: "og:title", content: "AI Chat Assistant — Aria" },
      { property: "og:description", content: "Conversational AI for professionals." },
    ],
  }),
  component: ChatPage,
});

type Msg = { role: "user" | "assistant"; content: string };

function ChatPage() {
  const chat = useServerFn(runChat);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hi, I'm Aria — your AI workplace assistant. Ask me anything: draft something, plan your day, or think through a problem." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const { content } = await chat({ data: { messages: next } });
      setMessages([...next, { role: "assistant", content: content || "(no response)" }]);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to reply");
      setMessages(next);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex h-[calc(100vh-4rem)] max-w-3xl flex-col px-4 py-6">
      <div className="mb-4">
        <p className="text-xs font-medium uppercase tracking-widest text-accent">Tool 05</p>
        <h1 className="text-3xl font-bold gradient-text">Chat with Aria</h1>
      </div>
      <div className="glass-card flex-1 overflow-y-auto rounded-2xl p-5">
        <div className="space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={
                  m.role === "user"
                    ? "max-w-[80%] rounded-2xl rounded-br-sm px-4 py-2.5 text-sm text-primary-foreground"
                    : "max-w-[80%] rounded-2xl rounded-bl-sm bg-secondary px-4 py-2.5 text-sm"
                }
                style={m.role === "user" ? { background: "var(--gradient-hero)" } : undefined}
              >
                <pre className="whitespace-pre-wrap font-sans">{m.content}</pre>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="rounded-2xl bg-secondary px-4 py-2.5">
                <div className="flex gap-1">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "0ms" }} />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "150ms" }} />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <input
          className={inputCls}
          placeholder="Ask Aria anything…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
        />
        <button
          onClick={send}
          disabled={loading || !input.trim()}
          className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50"
          style={{ background: "var(--gradient-hero)" }}
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        Aria may produce inaccurate information. For legal, financial, or medical matters, verify with a qualified expert.
      </p>
    </div>
  );
}
