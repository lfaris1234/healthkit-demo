"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type Msg = { id: string; role: "user" | "assistant"; text: string; time: number };

const SUGGESTIONS = [
  "How can I measure my fiber intake?",
  "What are the types of microbiome?",
  "What are the benefits of prebiotics?",
];

function botReply(text: string): string {
  const t = text.toLowerCase();
  if (t.includes("fiber")) {
    return "Aim for 25–38g/day. Track by reading nutrition labels and adding up grams at meals. High-fiber picks: lentils, chia, beans, oats, berries.";
  }
  if (t.includes("microbiome")) {
    return "The gut microbiome includes bacteria, viruses, and fungi. Diversity is generally beneficial. Diet (fiber & fermented foods) helps support it.";
  }
  if (t.includes("prebiotic")) {
    return "Prebiotics are fibers that feed beneficial gut bacteria. Sources: inulin (chicory), oats, onions, garlic, bananas, asparagus, Jerusalem artichoke.";
  }
  if (t.includes("result") || t.includes("latest")) {
    return "Your latest test result is available in Dashboard → Your Health Score. (Demo data: score 9/10.)";
  }
  return "Here’s a general tip: build meals with fiber + protein, and add fermented foods a few times a week. Ask me about fiber targets or recipe ideas.";
}

export default function NutritionChatPage() {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [text, setText] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const raw = localStorage.getItem("chatHistory");
    setMsgs(raw ? JSON.parse(raw) : [
      {
        id: crypto.randomUUID(),
        role: "assistant",
        text: "Hello 👋 I’m your personal nutrition assistant. How can I help you?",
        time: Date.now(),
      },
      {
        id: crypto.randomUUID(),
        role: "assistant",
        text: "Your test result is now available. Click here to access the latest results.",
        time: Date.now(),
      },
    ]);
  }, []);

  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(msgs));
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  const send = (txt: string) => {
    if (!txt.trim()) return;
    const user: Msg = { id: crypto.randomUUID(), role: "user", text: txt.trim(), time: Date.now() };
    const reply: Msg = {
      id: crypto.randomUUID(),
      role: "assistant",
      text: botReply(txt),
      time: Date.now() + 300,
    };
    setMsgs((m) => [...m, user, reply]);
    setText("");
  };

  return (
    <div className="grid gap-3">
      {/* header */}
      <div className="flex items-center gap-2">
        <Link href="/feed" className="rounded-md border px-3 py-1.5 text-sm">←</Link>
        <div className="flex-1 text-center">
          <p className="text-sm font-medium">Nutrition Chat</p>
          <p className="text-[11px] text-gray-500">Wed 8:21 AM</p>
        </div>
        <button className="rounded-md border px-3 py-1.5 text-sm">⋮</button>
      </div>

      {/* messages */}
      <div className="rounded-xl border bg-gray-50 p-3">
        <div className="grid gap-2">
          {msgs.map((m) => (
            <div key={m.id} className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${m.role==="user" ? "ml-auto bg-[var(--color-primary)] text-white" : "bg-white"}`}>
              {m.text.includes("Click here") ? (
                <Link href="/dashboard" className="underline">{m.text}</Link>
              ) : (
                m.text
              )}
            </div>
          ))}
          <div ref={endRef} />
        </div>
      </div>

      {/* suggestions */}
      <div className="grid gap-2">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => send(s)}
            className="rounded-full border px-3 py-1.5 text-sm text-left"
          >
            {s}
          </button>
        ))}
      </div>

      {/* input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(text);
        }}
        className="sticky bottom-0 mt-1 flex items-center gap-2 rounded-full border px-3 py-2"
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message"
          className="w-full outline-none"
        />
        <button aria-label="Send" className="rounded-full bg-[var(--color-primary)] px-3 py-1 text-white">
          ➤
        </button>
      </form>
    </div>
  );
}
