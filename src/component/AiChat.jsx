import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ message, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4500);
    return () => clearTimeout(t);
  }, [onClose]);

  const colors =
    type === "success"
      ? "bg-green-50 border-green-200 text-green-800"
      : type === "warning"
      ? "bg-yellow-50 border-yellow-200 text-yellow-800"
      : "bg-red-50 border-red-200 text-red-800";

  const icons = {
    success: (
      <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
    warning: (
      <svg className="w-4 h-4 text-yellow-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      </svg>
    ),
    error: (
      <svg className="w-4 h-4 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in-right max-w-sm w-full">
      <div className={`flex items-start gap-3 px-4 py-3 rounded-xl border shadow-lg ${colors}`}>
        {icons[type] ?? icons.error}
        <p className="text-sm font-medium leading-snug flex-1">{message}</p>
        <button
          onClick={onClose}
          className="text-current opacity-50 hover:opacity-100 transition-opacity mt-0.5"
          aria-label="Bağla"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ─── Typing indicator ─────────────────────────────────────────────────────────
function TypingIndicator() {
  return (
    <div className="flex items-end gap-3 animate-fade-up">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shrink-0 shadow-sm">
        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </div>
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
        <div className="flex items-center gap-1.5 h-5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 block"
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
    <div className="flex flex-col items-center justify-center h-full py-16 text-center animate-fade-in">
      <div className="w-20 h-20 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-5 shadow-sm">
        <svg className="w-10 h-10 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        Azərbaycan Hüquq Assistanı
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs leading-relaxed">
        Hüquqi suallarınızı Azərbaycan qanunvericiliyi əsasında cavablandırıram. Sualınızı aşağıya yazın.
      </p>
      <div className="mt-6 flex flex-wrap gap-2 justify-center max-w-sm">
        {["Əmək müqaviləsi", "Mülkiyyət hüququ", "Ailə hüququ"].map((hint) => (
          <span
            key={hint}
            className="px-3 py-1.5 text-xs font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full border border-blue-100 dark:border-blue-800"
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
        <div className="bg-blue-600 text-white px-4 py-3 rounded-2xl rounded-br-sm shadow-sm">
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message}</p>
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500 text-right mt-1 mr-1">Siz</p>
      </div>
      <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center shrink-0 shadow-sm">
        <svg className="w-4 h-4 text-gray-500 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>
    </div>
  );
}

function BotBubble({ message, index }) {
  const formatBoldText = (text) =>
    text.replace(/\*\*(.*?)\*\*/g, "<strong class='text-blue-800 dark:text-blue-300 font-semibold'>$1</strong>");

  return (
    <div
      className="flex items-end gap-3 animate-fade-up"
      style={{ animationDelay: `${index * 40 + 20}ms` }}
    >
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shrink-0 shadow-sm">
        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </div>
      <div className="max-w-[78%]">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm">
          {message ? (
            <p
              className="text-sm leading-relaxed text-gray-800 dark:text-gray-100 whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: formatBoldText(message) }}
            />
          ) : (
            <div className="flex gap-1.5 h-5 items-center">
              <div className="w-16 h-3 bg-gray-200 dark:bg-gray-700 rounded animate-[shimmer_1.6s_linear_infinite] bg-[length:200%_100%] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700" />
            </div>
          )}
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 ml-1">LAW AI</p>
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

  const showToast = (message, type = "error") => setToast({ message, type });
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

    try {
      const response = await fetch(`${baseUrl}ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Server xətası: ${response.status} ${response.statusText}`);
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
      // Remove the empty bot bubble if nothing was streamed
      setChatArea((prev) => {
        const last = prev[prev.length - 1];
        if (last && !last.botMessage) return prev.slice(0, -1);
        return prev;
      });

      const isNetworkError = error instanceof TypeError;
      showToast(
        isNetworkError
          ? "Serverə qoşulmaq mümkün olmadı. İnternet bağlantınızı yoxlayın."
          : error.message || "Gözlənilməz xəta baş verdi. Yenidən cəhd edin.",
        "error"
      );
    } finally {
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
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-950 w-full">
      {/* Toast */}
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={closeToast} />
      )}

      {/* Header */}
      <header className="shrink-0 flex items-center gap-3 px-5 h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-sm">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <div>
          <h1 className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">LAW AI</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-tight">Azərbaycan Hüquq Assistanı</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs text-gray-500 dark:text-gray-400">Onlayn</span>
        </div>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto px-4 py-6 space-y-5">
        <div className="max-w-3xl mx-auto w-full h-full flex flex-col">
          {chatArea.length === 0 && !loading ? (
            <EmptyState />
          ) : (
            chatArea.map((item, i) => (
              <div key={i} className="space-y-5">
                <UserBubble message={item.userMessage} index={i} />
                {item.botMessage !== undefined && (
                  <BotBubble message={item.botMessage} index={i} />
                )}
              </div>
            ))
          )}
          {loading && chatArea.length > 0 && !chatArea[chatArea.length - 1]?.botMessage && (
            <div className="mt-5">
              <TypingIndicator />
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </main>

      {/* Input area */}
      <footer className="shrink-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 px-4 py-4">
        <div className="max-w-3xl mx-auto w-full space-y-2">
          {inputError && (
            <div className="flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400 animate-fade-in px-1">
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {inputError}
            </div>
          )}
          <div
            className={`flex items-end gap-3 bg-gray-50 dark:bg-gray-800 rounded-2xl border transition-all duration-200 px-4 py-3 ${
              inputError
                ? "border-red-400 dark:border-red-500 ring-2 ring-red-100 dark:ring-red-900/30"
                : isDisabled
                ? "border-gray-200 dark:border-gray-700 opacity-60"
                : "border-gray-200 dark:border-gray-700 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 dark:focus-within:ring-blue-900/30"
            }`}
          >
            <textarea
              ref={textareaRef}
              value={ask}
              onChange={(e) => {
                setAsk(e.target.value);
                if (inputError) setInputError("");
              }}
              onKeyDown={handleKeyDown}
              disabled={isDisabled}
              rows={1}
              placeholder="Hüquqi sualınızı yazın… (Enter — göndər, Shift+Enter — yeni sətir)"
              className="flex-1 bg-transparent text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 resize-none outline-none leading-relaxed max-h-36 overflow-y-auto disabled:cursor-not-allowed"
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
              className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                isDisabled || !ask.trim()
                  ? "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md"
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
          <p className="text-xs text-gray-400 dark:text-gray-600 text-center">
            LAW AI məlumat məqsədli cavablar verir. Rəsmi hüquqi məsləhət üçün vəkilə müraciət edin.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AiChat;
