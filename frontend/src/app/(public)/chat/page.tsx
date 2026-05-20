"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2, AlertCircle, Lightbulb } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const suggestedQuestions = [
  "What is Kenya's total public debt as of 2024?",
  "Which MDA has the highest pending bills?",
  "What happened to the Linda Mama programme?",
  "How much was the revenue shortfall in 2023/2024?",
  "What does an adverse audit opinion mean?",
  "Which vaccines were out of stock and for how long?",
  "How much did the government pay in commitment fees?",
  "What is the Equalisation Fund and how much was released?",
  "What are the main IFMIS issues reported?",
  "How does Kenya's debt compare to the parliamentary ceiling?",
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Habari! I'm the Uwazi Analytics AI assistant. I have detailed knowledge of the Kenya OAG 2023/2024 audit report. Ask me anything about Kenya's public finances, budget, debt, pending bills, or audit findings.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMessage: Message = {
      role: "user",
      content: text.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const history = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text.trim(),
          history,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to get response");
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.response,
          timestamp: new Date(),
        },
      ]);
    } catch (err: any) {
      setError(err.message || "Failed to get response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("en-KE", { hour: "2-digit", minute: "2-digit" });

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 112px)" }}>
      {/* Header */}
      <div style={{ marginBottom: "20px", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "800", color: "white", margin: 0 }}>
            AI Chat
          </h1>
          <div style={{ padding: "4px 10px", borderRadius: "20px", backgroundColor: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}>
            <span style={{ fontSize: "11px", color: "#10b981", fontWeight: "600" }}>OAG 2023/2024 Knowledge</span>
          </div>
        </div>
        <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>
          Ask any question about Kenya's public finances and audit findings
        </p>
      </div>

      <div style={{ display: "flex", gap: "16px", flex: 1, minHeight: 0 }}>
        {/* Suggested questions */}
        <div style={{ width: "240px", flexShrink: 0, backgroundColor: "#0d1424", border: "1px solid #1a2744", borderRadius: "16px", padding: "16px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
            <Lightbulb size={14} color="#f59e0b" />
            <p style={{ color: "#f59e0b", fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px", margin: 0 }}>
              Suggested Questions
            </p>
          </div>
          {suggestedQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => sendMessage(q)}
              disabled={loading}
              style={{ padding: "8px 10px", borderRadius: "8px", cursor: "pointer", border: "1px solid #1a2744", backgroundColor: "transparent", color: "#94a3b8", fontSize: "11px", lineHeight: "1.4", textAlign: "left", transition: "all 0.15s" }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#1a2744"; e.currentTarget.style.color = "white"; e.currentTarget.style.borderColor = "#10b981"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#94a3b8"; e.currentTarget.style.borderColor = "#1a2744"; }}
            >
              {q}
            </button>
          ))}
        </div>

        {/* Chat area */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", minHeight: 0, backgroundColor: "#0d1424", border: "1px solid #1a2744", borderRadius: "16px", padding: "20px", display: "flex", flexDirection: "column", gap: "16px", marginBottom: "12px" }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: "flex", gap: "12px", flexDirection: msg.role === "user" ? "row-reverse" : "row" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "10px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: msg.role === "assistant" ? "rgba(16,185,129,0.15)" : "#1a2744", border: `1px solid ${msg.role === "assistant" ? "rgba(16,185,129,0.3)" : "#1e3a5f"}` }}>
                  {msg.role === "assistant" ? <Bot size={16} color="#10b981" /> : <User size={16} color="#64748b" />}
                </div>
                <div style={{ maxWidth: "75%", display: "flex", flexDirection: "column", gap: "4px", alignItems: msg.role === "user" ? "flex-end" : "flex-start" }}>
                  <div style={{ padding: "12px 16px", borderRadius: "12px", backgroundColor: msg.role === "user" ? "rgba(16,185,129,0.15)" : "#111827", border: `1px solid ${msg.role === "user" ? "rgba(16,185,129,0.25)" : "#1a2744"}`, color: "#e2e8f0", fontSize: "13px", lineHeight: "1.7", whiteSpace: "pre-wrap" }}>
                    {msg.content}
                  </div>
                  <p style={{ color: "#334155", fontSize: "10px", margin: 0, padding: "0 4px" }}>{formatTime(msg.timestamp)}</p>
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "10px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)" }}>
                  <Bot size={16} color="#10b981" />
                </div>
                <div style={{ padding: "12px 16px", borderRadius: "12px", backgroundColor: "#111827", border: "1px solid #1a2744", display: "flex", alignItems: "center", gap: "8px" }}>
                  <Loader2 size={14} color="#10b981" style={{ animation: "spin 1s linear infinite" }} />
                  <span style={{ color: "#64748b", fontSize: "13px" }}>Analyzing report data...</span>
                </div>
              </div>
            )}

            {error && (
              <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 16px", borderRadius: "12px", backgroundColor: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
                <AlertCircle size={14} color="#ef4444" />
                <span style={{ color: "#ef4444", fontSize: "13px" }}>{error}</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{ backgroundColor: "#0d1424", border: "1px solid #1a2744", borderRadius: "16px", padding: "12px 16px", display: "flex", gap: "12px", alignItems: "flex-end", flexShrink: 0 }}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about Kenya's public finances... (Enter to send, Shift+Enter for new line)"
              rows={2}
              style={{ flex: 1, backgroundColor: "transparent", border: "none", color: "white", fontSize: "13px", lineHeight: "1.6", resize: "none", outline: "none", fontFamily: "inherit" }}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={loading || !input.trim()}
              style={{ width: "36px", height: "36px", borderRadius: "10px", backgroundColor: input.trim() && !loading ? "#10b981" : "#1a2744", border: "none", cursor: input.trim() && !loading ? "pointer" : "not-allowed", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background-color 0.15s" }}
            >
              <Send size={15} color={input.trim() && !loading ? "white" : "#334155"} />
            </button>
          </div>
          <p style={{ color: "#334155", fontSize: "10px", textAlign: "center", margin: "8px 0 0 0" }}>
            Powered by Claude AI · Knowledge sourced from OAG Kenya 2023/2024 Popular Report
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
