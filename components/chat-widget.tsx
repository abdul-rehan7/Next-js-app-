"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ChatIcon,
  SendIcon,
  SparkleIcon,
  XIcon,
} from "@/components/icons";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const starterMessage: ChatMessage = {
  role: "assistant",
  content:
    "Hi! I'm the Sole Studio concierge. Ask me about PUMA fits, sizing, shipping, or returns.",
};

const quickPrompts = [
  "Which PUMA should I start with?",
  "How do PUMA sizes run?",
  "What's your return policy?",
];

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1 py-1" aria-label="Thinking">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink/45" />
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink/45 [animation-delay:150ms]" />
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink/45 [animation-delay:300ms]" />
    </span>
  );
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([starterMessage]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const replyRef = useRef("");

  useEffect(() => {
    if (!open) {
      return;
    }

    const timer = window.setTimeout(() => inputRef.current?.focus(), 80);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const node = scrollRef.current;
    if (node) {
      node.scrollTop = node.scrollHeight;
    }
  }, [messages, error, open, pending]);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  async function sendMessage(raw: string) {
    const content = raw.trim();

    if (!content || pending) {
      return;
    }

    const userMessage: ChatMessage = { role: "user", content };
    const nextMessages = [...messages, userMessage];
    const controller = new AbortController();

    abortRef.current = controller;
    replyRef.current = "";
    setMessages([...nextMessages, { role: "assistant", content: "" }]);
    setInput("");
    setError(null);
    setPending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
        signal: controller.signal,
      });

      if (!response.ok) {
        let message = "The concierge could not reply. Please try again.";

        try {
          const data = (await response.json()) as { error?: unknown };
          if (typeof data.error === "string") {
            message = data.error;
          }
        } catch {
          // Keep the fallback message.
        }

        throw new Error(message);
      }

      if (!response.body) {
        throw new Error("The concierge could not reply. Please try again.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        const chunk = decoder.decode(value, { stream: true });
        if (!chunk) {
          continue;
        }

        replyRef.current += chunk;
        const reply = replyRef.current;
        setMessages((current) => {
          const updated = [...current];
          updated[updated.length - 1] = {
            role: "assistant",
            content: reply,
          };
          return updated;
        });
      }

      const tail = decoder.decode();
      if (tail) {
        replyRef.current += tail;
        const reply = replyRef.current;
        setMessages((current) => {
          const updated = [...current];
          updated[updated.length - 1] = {
            role: "assistant",
            content: reply,
          };
          return updated;
        });
      }

      if (!replyRef.current.trim()) {
        throw new Error("The concierge did not return a reply. Try again.");
      }
    } catch (caught) {
      if (caught instanceof DOMException && caught.name === "AbortError") {
        return;
      }

      setError(
        caught instanceof Error
          ? caught.message
          : "The concierge could not reply. Please try again.",
      );
      setMessages((current) => {
        const last = current[current.length - 1];
        if (last?.role === "assistant" && !last.content) {
          return current.slice(0, -1);
        }
        return current;
      });
    } finally {
      if (abortRef.current === controller) {
        abortRef.current = null;
      }
      setPending(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  return (
    <>
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open chat with the Sole Studio concierge"
          aria-expanded={false}
          aria-controls="sole-studio-chat"
          className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3.5 text-sm font-semibold text-white shadow-lift transition hover:-translate-y-0.5 hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 sm:bottom-6 sm:right-6"
        >
          <span className="relative grid place-items-center">
            <ChatIcon className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-ink bg-brand-400" />
          </span>
          Chat with us
        </button>
      ) : null}

      {open ? (
        <section
          id="sole-studio-chat"
          aria-label="Sole Studio concierge"
          className="fixed inset-x-4 bottom-20 z-50 flex max-h-[min(620px,calc(100dvh-7rem))] flex-col overflow-hidden rounded-[1.75rem] border border-ink/25 bg-white shadow-lift sm:inset-x-auto sm:bottom-24 sm:right-6 sm:w-[380px]"
        >
          <header className="flex items-start justify-between gap-3 bg-ink px-4 py-4 text-white">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-600">
                <SparkleIcon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-bold tracking-tight">
                  Sole Studio Concierge
                </p>
                <p className="mt-0.5 text-[11px] text-white/60">
                  PUMA picks, sizing & orders
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                abortRef.current?.abort();
                setOpen(false);
              }}
              aria-label="Close chat"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              <XIcon className="h-4 w-4" />
            </button>
          </header>

          <div
            ref={scrollRef}
            role="log"
            aria-live="polite"
            aria-relevant="additions text"
            className="min-h-0 flex-1 space-y-3 overflow-y-auto bg-[#faf8f4] px-4 py-4"
          >
            {messages.map((message, index) => {
              const isUser = message.role === "user";
              const isStreaming =
                pending &&
                !isUser &&
                index === messages.length - 1 &&
                !message.content;

              return (
                <div
                  key={index}
                  className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[86%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      isUser
                        ? "rounded-br-sm bg-brand-600 text-white"
                        : "rounded-bl-sm border border-ink/20 bg-white text-ink shadow-sm"
                    }`}
                  >
                    {isStreaming ? <TypingDots /> : message.content}
                  </div>
                </div>
              );
            })}

            {error ? (
              <div
                role="alert"
                className="rounded-2xl border border-brand-300 bg-brand-50 px-3.5 py-2.5 text-xs font-medium leading-relaxed text-brand-800"
              >
                {error}
              </div>
            ) : null}
          </div>

          {messages.length === 1 && !pending ? (
            <div className="flex flex-wrap gap-2 border-t border-ink/10 bg-white px-4 pt-3">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => void sendMessage(prompt)}
                  className="rounded-full border border-ink/25 bg-white px-3 py-1.5 text-[11px] font-semibold text-ink transition hover:border-brand-400 hover:bg-brand-50 hover:text-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
                >
                  {prompt}
                </button>
              ))}
            </div>
          ) : null}

          <form
            onSubmit={handleSubmit}
            className="border-t border-ink/10 bg-white p-3"
          >
            <div className="flex items-end gap-2 rounded-2xl border border-ink/25 bg-white p-1.5 transition focus-within:border-brand-600 focus-within:ring-4 focus-within:ring-brand-200">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    event.currentTarget.form?.requestSubmit();
                  }
                }}
                rows={1}
                maxLength={1000}
                disabled={pending}
                placeholder="Ask about a pair, fit, or delivery..."
                aria-label="Message the Sole Studio concierge"
                className="max-h-24 min-h-10 flex-1 resize-none bg-transparent px-2.5 py-2 text-sm leading-relaxed text-ink outline-none placeholder:text-ink/45 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={pending || !input.trim()}
                aria-label="Send message"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-600 text-white transition hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <SendIcon className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 px-1 text-[10px] leading-relaxed text-muted">
              AI assistant. Check the product page for final details.
            </p>
          </form>
        </section>
      ) : null}
    </>
  );
}
