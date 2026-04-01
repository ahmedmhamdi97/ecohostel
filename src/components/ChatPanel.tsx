"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { X, Send, Sparkles } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChatPanel({ isOpen, onClose }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Drag-to-close state
  const dragStartY = useRef<number | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [dragOffset, setDragOffset] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 400);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;

    const newMessages: Message[] = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.content ?? data.error ?? "Something went wrong." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Couldn't reach the AI. Check your connection." },
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages]);

  // Drag handle handlers
  const onDragStart = (clientY: number) => {
    dragStartY.current = clientY;
  };
  const onDragMove = (clientY: number) => {
    if (dragStartY.current === null) return;
    const delta = clientY - dragStartY.current;
    if (delta > 0) setDragOffset(delta);
  };
  const onDragEnd = (clientY: number) => {
    if (dragStartY.current === null) return;
    const delta = clientY - dragStartY.current;
    dragStartY.current = null;
    setDragOffset(0);
    if (delta > 80) onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 transition-opacity duration-300"
        style={{
          background: "rgba(0,0,0,0.4)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          backdropFilter: isOpen ? "blur(2px)" : "none",
        }}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className="fixed left-0 right-0 bottom-0 z-50 flex flex-col"
        style={{
          height: "85dvh",
          background: "#f8fafc",
          borderRadius: "24px 24px 0 0",
          transform: isOpen
            ? `translateY(${dragOffset}px)`
            : "translateY(100%)",
          transition: dragOffset > 0 ? "none" : "transform 0.35s cubic-bezier(0.32, 0.72, 0, 1)",
          boxShadow: "0 -8px 40px rgba(0,0,0,0.18)",
          willChange: "transform",
        }}
      >
        {/* Drag handle area */}
        <div
          className="flex flex-col items-center pt-3 pb-2 cursor-grab active:cursor-grabbing shrink-0"
          onMouseDown={(e) => onDragStart(e.clientY)}
          onMouseMove={(e) => onDragMove(e.clientY)}
          onMouseUp={(e) => onDragEnd(e.clientY)}
          onTouchStart={(e) => onDragStart(e.touches[0].clientY)}
          onTouchMove={(e) => onDragMove(e.touches[0].clientY)}
          onTouchEnd={(e) => onDragEnd(e.changedTouches[0].clientY)}
        >
          <div className="w-10 h-1 rounded-full" style={{ background: "#cbd5e1" }} />
        </div>

        {/* Header */}
        <div
          className="flex items-center gap-2.5 px-4 pb-3 shrink-0"
          style={{ borderBottom: "1px solid #e2e8f0" }}
        >
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "linear-gradient(135deg, #1B2A4A, #2d4270)" }}
          >
            <Sparkles size={15} className="text-white" strokeWidth={2} />
          </div>
          <div className="flex-1">
            <p className="font-bold text-slate-900 text-sm leading-tight">Ask the Manual</p>
            <p className="text-slate-400 text-[10px] font-medium">AI assistant · Eco Hostel Granada</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center active:bg-slate-100 transition-colors"
            style={{ background: "#f1f5f9" }}
          >
            <X size={16} className="text-slate-500" strokeWidth={2} />
          </button>
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
          style={{ overscrollBehavior: "contain" }}
        >
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full gap-3 pb-8">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #1B2A4A, #2d4270)" }}
              >
                <Sparkles size={26} className="text-white" strokeWidth={1.5} />
              </div>
              <p className="text-slate-900 font-bold text-base">How can I help?</p>
              <p className="text-slate-400 text-sm text-center leading-relaxed px-6">
                Ask me anything about shifts, rules, emergencies, the walking tour, or dinner.
              </p>
              <div className="flex flex-wrap gap-2 justify-center mt-1">
                {["What do I do in the morning shift?", "Fire alarm procedure", "Walking tour stop 12"].map((q) => (
                  <button
                    key={q}
                    onClick={() => setInput(q)}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold transition-colors active:scale-95"
                    style={{ background: "#e2e8f0", color: "#475569" }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div
                  className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mr-2 mt-0.5"
                  style={{ background: "linear-gradient(135deg, #1B2A4A, #2d4270)" }}
                >
                  <Sparkles size={11} className="text-white" strokeWidth={2} />
                </div>
              )}
              <div
                className="max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed"
                style={
                  msg.role === "user"
                    ? {
                        background: "#1B2A4A",
                        color: "white",
                        borderBottomRightRadius: 6,
                      }
                    : {
                        background: "white",
                        color: "#1e293b",
                        borderBottomLeftRadius: 6,
                        boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
                        whiteSpace: "pre-wrap",
                      }
                }
              >
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div
                className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mr-2 mt-0.5"
                style={{ background: "linear-gradient(135deg, #1B2A4A, #2d4270)" }}
              >
                <Sparkles size={11} className="text-white" strokeWidth={2} />
              </div>
              <div
                className="px-4 py-3 rounded-2xl"
                style={{
                  background: "white",
                  borderBottomLeftRadius: 6,
                  boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
                }}
              >
                <div className="flex gap-1 items-center">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        background: "#94a3b8",
                        animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input bar */}
        <div
          className="shrink-0 px-4 py-3 flex items-center gap-2"
          style={{
            borderTop: "1px solid #e2e8f0",
            background: "white",
            paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom, 0px))",
          }}
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
            placeholder="Ask anything…"
            className="flex-1 rounded-2xl px-4 py-2.5 text-sm outline-none"
            style={{
              background: "#f1f5f9",
              color: "#0f172a",
              border: "none",
            }}
          />
          <button
            onClick={send}
            disabled={!input.trim() || loading}
            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 active:scale-90 transition-all"
            style={{
              background:
                input.trim() && !loading
                  ? "linear-gradient(135deg, #1B2A4A, #2d4270)"
                  : "#e2e8f0",
            }}
          >
            <Send
              size={16}
              strokeWidth={2}
              className={input.trim() && !loading ? "text-white" : "text-slate-400"}
            />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-5px); }
        }
      `}</style>
    </>
  );
}
