"use client";

import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type Message = {
  role: "user" | "assistant";
  text: string;
};

export function ChatbotCard() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hello. I can help route you to the right maternity doctor, summarize your next appointment, or suggest when to contact the hospital."
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();

    if (!input.trim()) {
      return;
    }

    const question = input.trim();
    setMessages((current) => [...current, { role: "user", text: question }]);
    setInput("");
    setLoading(true);

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 4000);

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question }),
        signal: controller.signal
      });

      clearTimeout(timeout);
      const payload = (await response.json()) as { answer?: string };
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          text:
            payload.answer ||
            "Please ask about the hospital, doctor, reservation, or booking. I will be happy to assist you."
        }
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          text:
            "Please ask about the hospital, doctor, reservation, or booking. I will be happy to assist you."
        }
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI assistant</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="max-h-[320px] space-y-3 overflow-y-auto rounded-2xl border border-white/10 bg-slate-950/40 p-4">
          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={`rounded-2xl px-4 py-3 text-sm leading-6 ${
                message.role === "assistant"
                  ? "bg-cyan-400/10 text-slate-100"
                  : "ml-auto bg-white/10 text-white"
              }`}
            >
              {message.text}
            </div>
          ))}
          {loading ? <div className="text-sm text-slate-400">Getting hospital guidance...</div> : null}
        </div>
        <form className="flex gap-3" onSubmit={onSubmit}>
          <Input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask which doctor to contact or what happens next." />
          <Button type="submit" disabled={loading}>
            Send
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
