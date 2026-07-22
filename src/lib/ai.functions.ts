import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const InputSchema = z.object({
  system: z.string(),
  user: z.string(),
  model: z.string().optional(),
});

export const runAI = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => InputSchema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("LOVABLE_API_KEY is not configured.");

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: data.model ?? "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: data.system },
          { role: "user", content: data.user },
        ],
      }),
    });

    if (res.status === 429) throw new Error("Rate limit reached. Please try again shortly.");
    if (res.status === 402) throw new Error("AI credits exhausted. Please add credits in Cloud settings.");
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`AI request failed: ${res.status} ${text.slice(0, 200)}`);
    }

    const json = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const content = json.choices?.[0]?.message?.content ?? "";
    return { content };
  });

const ChatSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(["system", "user", "assistant"]),
      content: z.string(),
    }),
  ),
});

export const runChat = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => ChatSchema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("LOVABLE_API_KEY is not configured.");

    const systemPrompt = {
      role: "system" as const,
      content:
        "You are Aria, a friendly and highly capable AI workplace assistant. You help professionals with drafting, summarizing, planning, and research. Keep responses concise, structured, and actionable. When giving advice that could carry risk (legal, financial, medical), remind the user to validate with a qualified expert.",
    };

    const messages = data.messages.some((m) => m.role === "system")
      ? data.messages
      : [systemPrompt, ...data.messages];

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ model: "google/gemini-2.5-flash", messages }),
    });

    if (res.status === 429) throw new Error("Rate limit reached. Please try again shortly.");
    if (res.status === 402) throw new Error("AI credits exhausted.");
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`AI request failed: ${res.status} ${text.slice(0, 200)}`);
    }
    const json = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    return { content: json.choices?.[0]?.message?.content ?? "" };
  });
