import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ message, detail, type, onClose, onRetry }) {
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    const duration = detail ? 7000 : type === "warning" ? 6000 : 5000;
    const t = setTimeout(onClose, duration);
    return () => clearTimeout(t);
  }, [onClose, detail, type]);

  const palette = {
    success: {
      wrap: "bg-green-50 border-green-200",
      title: "text-green-900",
      detail: "text-green-700 bg-green-100 border-green-200",
      btn: "text-green-600 hover:bg-green-100",
      icon: <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>,
    },
    warning: {
      wrap: "bg-yellow-50 border-yellow-200",
      title: "text-yellow-900",
      detail: "text-yellow-700 bg-yellow-100 border-yellow-200",
      btn: "text-yellow-600 hover:bg-yellow-100",
      icon: <svg className="w-4 h-4 text-yellow-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /></svg>,
    },
    error: {
      wrap: "bg-red-50 border-red-200",
      title: "text-red-900",
      detail: "text-red-700 bg-red-100 border-red-200",
      btn: "text-red-600 hover:bg-red-100",
      icon: <svg className="w-4 h-4 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    },
  };

  const c = palette[type] ?? palette.error;

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in-right w-full max-w-sm">
      <div className={`rounded-xl border shadow-lg overflow-hidden ${c.wrap}`}>
        {/* Main row */}
        <div className="flex items-start gap-3 px-4 py-3">
          {c.icon}
          <p className={`text-sm font-semibold leading-snug flex-1 ${c.title}`}>{message}</p>
          <div className="flex items-center gap-1 shrink-0">
            {detail && (
              <button
                onClick={() => setShowDetail((v) => !v)}
                className={`text-xs px-1.5 py-0.5 rounded font-medium transition-colors ${c.btn}`}
                aria-label="Ətraflı"
              >
                {showDetail ? "Gizlə" : "Ətraflı"}
              </button>
            )}
            <button
              onClick={onClose}
              className={`p-0.5 rounded transition-colors opacity-60 hover:opacity-100 ${c.btn}`}
              aria-label="Bağla"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Detail panel */}
        {showDetail && detail && (
          <div className={`px-4 pb-3 animate-fade-in`}>
            <pre className={`text-xs leading-relaxed font-mono px-3 py-2 rounded-lg border whitespace-pre-wrap break-all ${c.detail}`}>
              {detail}
            </pre>
          </div>
        )}

        {/* Retry button */}
        {onRetry && (
          <div className={`px-4 pb-3 ${showDetail ? "" : "pt-0"}`}>
            <button
              onClick={() => { onClose(); onRetry(); }}
              className={`text-xs font-semibold underline underline-offset-2 transition-opacity hover:opacity-70 ${c.title}`}
            >
              Yenidən cəhd et →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Typing indicator ─────────────────────────────────────────────────────────
function TypingIndicator() {
  return (
    <div className="flex items-end gap-3 animate-fade-up">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shrink-0 shadow-md shadow-blue-500/30">
        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </div>
      <div className="backdrop-blur-md bg-white/10 border border-white/15 rounded-2xl rounded-bl-sm px-4 py-3 shadow-lg">
        <div className="flex items-center gap-1.5 h-5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-2 h-2 rounded-full bg-blue-300/70 block"
              style={{ animation: `typing-dot 1.2s ease-in-out infinite`, animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 py-16 text-center animate-fade-in">
      <div className="w-20 h-20 rounded-2xl backdrop-blur-md bg-white/10 border border-white/15 flex items-center justify-center mb-5 shadow-xl shadow-black/20">
        <svg className="w-10 h-10 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </div>
      <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
        Azərbaycan Hüquq Assistanı
      </h3>
      <p className="text-sm text-white/50 max-w-xs leading-relaxed">
        Hüquqi suallarınızı Azərbaycan qanunvericiliyi əsasında cavablandırıram. Sualınızı aşağıya yazın.
      </p>
      <div className="mt-6 flex flex-wrap gap-2 justify-center max-w-sm">
        {["Əmək müqaviləsi", "Mülkiyyət hüququ", "Ailə hüququ"].map((hint) => (
          <span
            key={hint}
            className="px-3 py-1.5 text-xs font-medium backdrop-blur-sm bg-white/10 text-blue-200 rounded-full border border-white/15 hover:bg-white/15 transition-colors cursor-default"
          >
            {hint}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Message bubbles ──────────────────────────────────────────────────────────
function UserBubble({ message, index }) {
  return (
    <div
      className="flex items-end justify-end gap-2 animate-fade-up"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <div className="max-w-[78%]">
        <div className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white px-4 py-3 rounded-2xl rounded-br-sm shadow-lg shadow-blue-500/25">
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message}</p>
        </div>
        <p className="text-xs text-white/30 text-right mt-1 mr-1">Siz</p>
      </div>
      <div className="w-8 h-8 rounded-full backdrop-blur-sm bg-white/15 border border-white/20 flex items-center justify-center shrink-0">
        <svg className="w-4 h-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>
    </div>
  );
}

function BotBubble({ message, index }) {
  const formatBoldText = (text) =>
    text.replace(/\*\*(.*?)\*\*/g, "<strong class='text-blue-200 font-semibold'>$1</strong>");

  return (
    <div
      className="flex items-end gap-3 animate-fade-up"
      style={{ animationDelay: `${index * 40 + 20}ms` }}
    >
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shrink-0 shadow-md shadow-blue-500/30">
        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </div>
      <div className="max-w-[78%]">
        <div className="backdrop-blur-md bg-white/10 border border-white/15 px-4 py-3 rounded-2xl rounded-bl-sm shadow-lg shadow-black/20">
          {message ? (
            <p
              className="text-sm leading-relaxed text-white/90 whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: formatBoldText(message) }}
            />
          ) : (
            <div className="h-4 w-24 rounded bg-white/15 animate-[shimmer_1.6s_linear_infinite] bg-[length:200%_100%]"
              style={{ backgroundImage: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)" }} />
          )}
        </div>
        <p className="text-xs text-white/30 mt-1 ml-1">LAW AI</p>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
const AiChat = () => {
  const [ask, setAsk] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [chatArea, setChatArea] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [toast, setToast] = useState(null);
  const [inputError, setInputError] = useState("");

  const bottomRef = useRef(null);
  const textareaRef = useRef(null);

  const baseUrl = "https://azelawai.onrender.com/";
  // const baseUrl = "http://localhost:3333/";

  const showToast = (message, type = "error", detail = null, onRetry = null) =>
    setToast({ message, type, detail, onRetry });
  const closeToast = () => setToast(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatArea, loading]);

  const handleAskClick = async () => {
    if (!ask.trim()) {
      setInputError("Sual boş ola bilməz");
      textareaRef.current?.focus();
      return;
    }

    setInputError("");
    setIsDisabled(true);
    setLoading(true);

    const userMessage = ask.trim();
    const data = { question: userMessage, session_id: sessionId };
    setAsk("");

    setChatArea((prev) => [...prev, { userMessage, botMessage: "" }]);

    const controller = new AbortController();
    // 90s hard timeout — Render cold start üçün kifayətdir
    const hardTimeout = setTimeout(() => controller.abort(), 90000);
    // 8s sonra hələ cavab gəlməsə — istifadəçini xəbərdar et
    const warnTimeout = setTimeout(() => {
      showToast("Server yüklənir, bir az gözləyin...", "warning");
    }, 8000);

    try {
      const response = await fetch(`${baseUrl}ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        signal: controller.signal,
      });

      clearTimeout(warnTimeout);

      if (!response.ok) {
        let serverMsg = "";
        try {
          const errBody = await response.json();
          serverMsg = errBody.error ?? errBody.message ?? JSON.stringify(errBody);
        } catch {
          serverMsg = await response.text().catch(() => "");
        }
        const err = new Error(`HTTP ${response.status} ${response.statusText}`);
        err.status = response.status;
        err.serverMsg = serverMsg;
        throw err;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullResponse = "";
      let chunkIndex = 0;

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        let chunkText = decoder.decode(value);

        if (chunkIndex === 0) {
          const firstLineIndex = chunkText.indexOf("\n");
          if (firstLineIndex !== -1) {
            try {
              const parsed = JSON.parse(chunkText.slice(0, firstLineIndex));
              setSessionId(parsed.sessionId);
            } catch {}
            chunkText = chunkText.slice(firstLineIndex + 1);
          }
        }

        fullResponse += chunkText;
        setChatArea((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            botMessage: fullResponse,
          };
          return updated;
        });
        chunkIndex++;
      }
    } catch (error) {
      clearTimeout(warnTimeout);

      // Boş bot bubble-ı sil
      setChatArea((prev) => {
        const last = prev[prev.length - 1];
        if (last && !last.botMessage) return prev.slice(0, -1);
        return prev;
      });

      if (error.name === "AbortError") {
        console.error("[LAW AI] Timeout:", { url: `${baseUrl}ask`, timeout: "90s" });
        showToast(
          "Zaman aşımı — server 90s ərzində cavab vermədi",
          "error",
          "AbortError: Server 90 saniyə ərzində heç bir cavab göndərmədi.\nRender free tier ilk sorğuda 30–60s yüklənir.",
          handleAskClick
        );
      } else if (error instanceof TypeError) {
        console.error("[LAW AI] Şəbəkə xətası:", error.message);
        showToast(
          "Şəbəkə xətası — serverə çatmaq mümkün olmadı",
          "error",
          `TypeError: ${error.message}\n\nURL: ${baseUrl}ask\nSəbəb: CORS, internet kəsilməsi, və ya server offline.`,
          handleAskClick
        );
      } else if (error.status) {
        console.error("[LAW AI] HTTP xəta:", { status: error.status, serverMsg: error.serverMsg });
        showToast(
          `Server xətası — ${error.message}`,
          "error",
          error.serverMsg
            ? `Server cavabı:\n${error.serverMsg}`
            : `HTTP ${error.status} — server xəta qaytardı, body boşdur.`
        );
      } else {
        console.error("[LAW AI] Gözlənilməz xəta:", error);
        showToast(
          "Gözlənilməz xəta baş verdi",
          "error",
          `${error.name}: ${error.message}${error.stack ? "\n\n" + error.stack.split("\n").slice(0, 4).join("\n") : ""}`,
          handleAskClick
        );
      }
    } finally {
      clearTimeout(hardTimeout);
      setLoading(false);
      setIsDisabled(false);
      setTimeout(() => textareaRef.current?.focus(), 50);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isDisabled) handleAskClick();
    }
  };

  useEffect(() => {
    if (!sessionId) return;
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`${baseUrl}history/${sessionId}`);
        if (res.status === 200 && res.data?.data) {
          setChatArea(res.data.data);
        }
      } catch {}
    };
    fetchHistory();
  }, []);

  return (
    <div className="relative flex flex-col h-screen w-full overflow-hidden">

      {/* ── Animated gradient background ── */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-950 via-indigo-900 to-slate-900" />
      <div className="absolute inset-0 -z-10 opacity-40"
        style={{ backgroundImage: "radial-gradient(ellipse at 20% 50%, #3b82f640 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, #6366f140 0%, transparent 60%)" }} />
      {/* subtle grid */}
      <div className="absolute inset-0 -z-10 opacity-10"
        style={{ backgroundImage: "linear-gradient(#ffffff18 1px, transparent 1px), linear-gradient(90deg, #ffffff18 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          detail={toast.detail}
          onRetry={toast.onRetry}
          onClose={closeToast}
        />
      )}

      {/* ── Header (glass) ── */}
      <header className="shrink-0 flex items-center gap-3 px-5 h-16
        backdrop-blur-xl bg-white/10 border-b border-white/10 shadow-lg shadow-black/20">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-md shadow-blue-500/30">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <div>
          <h1 className="text-sm font-bold text-white leading-tight tracking-wide">LAW AI</h1>
          <p className="text-xs text-blue-200/70 leading-tight">Azərbaycan Hüquq Assistanı</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/60 animate-pulse" />
          <span className="text-xs text-white/50 font-medium">Onlayn</span>
        </div>
      </header>

      {/* ── Messages ── */}
      <main className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-3xl mx-auto w-full flex flex-col gap-5">
          {chatArea.length === 0 && !loading ? (
            <EmptyState />
          ) : (
            chatArea.map((item, i) => (
              <div key={i} className="flex flex-col gap-5">
                <UserBubble message={item.userMessage} index={i} />
                {item.botMessage !== undefined && (
                  <BotBubble message={item.botMessage} index={i} />
                )}
              </div>
            ))
          )}
          {loading && chatArea.length > 0 && !chatArea[chatArea.length - 1]?.botMessage && (
            <TypingIndicator />
          )}
          <div ref={bottomRef} />
        </div>
      </main>

      {/* ── Input area (glass) ── */}
      <footer className="shrink-0 px-4 py-4 backdrop-blur-xl bg-white/8 border-t border-white/10">
        <div className="max-w-3xl mx-auto w-full space-y-2">
          {inputError && (
            <div className="flex items-center gap-1.5 text-xs text-red-300 animate-fade-in px-1">
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {inputError}
            </div>
          )}
          <div className={`flex items-end gap-3 backdrop-blur-md rounded-2xl border transition-all duration-200 px-4 py-3 ${
            inputError
              ? "bg-red-500/10 border-red-400/50 ring-2 ring-red-400/20"
              : isDisabled
              ? "bg-white/5 border-white/10 opacity-60"
              : "bg-white/10 border-white/15 focus-within:border-blue-400/50 focus-within:ring-2 focus-within:ring-blue-400/20 focus-within:bg-white/12"
          }`}>
            <textarea
              ref={textareaRef}
              value={ask}
              onChange={(e) => { setAsk(e.target.value); if (inputError) setInputError(""); }}
              onKeyDown={handleKeyDown}
              disabled={isDisabled}
              rows={1}
              placeholder="Hüquqi sualınızı yazın… (Enter — göndər, Shift+Enter — yeni sətir)"
              className="flex-1 bg-transparent text-sm text-white placeholder-white/35 resize-none outline-none leading-relaxed max-h-36 overflow-y-auto disabled:cursor-not-allowed"
              style={{ minHeight: "24px" }}
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = Math.min(e.target.scrollHeight, 144) + "px";
              }}
            />
            <button
              onClick={handleAskClick}
              disabled={isDisabled}
              aria-label="Göndər"
              className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${
                isDisabled || !ask.trim()
                  ? "bg-white/10 text-white/30 cursor-not-allowed"
                  : "bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105"
              }`}
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              )}
            </button>
          </div>
          <p className="text-xs text-white/25 text-center">
            LAW AI məlumat məqsədli cavablar verir. Rəsmi hüquqi məsləhət üçün vəkilə müraciət edin.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AiChat;
