import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { apiFetch } from "@/pages/api/fetchapi";

const cssVar = (name) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();

const getGradient = () =>
  `linear-gradient(135deg, hsl(${cssVar("--glow-primary")}), hsl(${cssVar("--glow-accent")}))`;

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [gradient, setGradient] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setGradient(getGradient());
  }, []);

  useEffect(() => {
    if (open) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);
    try {
      const apiMessages = updatedMessages.map((m) => ({
        role: m.role === "bot" ? "assistant" : m.role,
        content: m.content,
      }));
      const data = await apiFetch("/chat", {
        method: "POST",
        body: JSON.stringify({ messages: apiMessages }),
      });
      if (data.reply) {
        setMessages((prev) => [...prev, { role: "bot", content: data.reply }]);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "Hubo un error. Intenta de nuevo." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <>
      {/* ── Botón flotante ── */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 99999,
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: gradient,
          color: "white",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 8px 24px hsl(${cssVar("--glow-primary")} / 0.4)`,
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        aria-label="Abrir chat"
      >
        {open ? (
          <svg
            width="22"
            height="22"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            width="22"
            height="22"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        )}
      </button>

      {/* ── Panel del chat ── */}
      <div
        style={{
          position: "fixed",
          bottom: "88px",
          right: "20px",
          zIndex: 99998,
          width: "min(380px, calc(100vw - 40px))",
          height: "480px",
          background: `hsl(${cssVar("--background")})`,
          borderRadius: "20px",
          boxShadow:
            "0 20px 60px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.08)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          border: `1px solid hsl(${cssVar("--border")})`,
          transition: "opacity 0.25s ease, transform 0.25s ease",
          opacity: open ? 1 : 0,
          transform: open
            ? "scale(1) translateY(0)"
            : "scale(0.95) translateY(8px)",
          pointerEvents: open ? "auto" : "none",
          transformOrigin: "bottom right",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: gradient,
            padding: "14px 16px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
            }}
          >
            ✨
          </div>
          <div>
            <div
              style={{
                color: "white",
                fontWeight: 700,
                fontSize: "14px",
                lineHeight: 1.2,
              }}
            >
              Asistencia en línea
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginTop: "3px",
              }}
            >
              <div
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: "#86efac",
                  animation: "statusPulse 2s ease-in-out infinite",
                }}
              />
              <span
                style={{ color: "rgba(255,255,255,0.85)", fontSize: "11px" }}
              >
                en línea
              </span>
            </div>
          </div>
        </div>

        {/* Mensajes */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "16px",
            background: `hsl(${cssVar("--muted")})`,
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {/* ── Estado vacío con robot animado ── */}
          {messages.length === 0 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                gap: "16px",
                textAlign: "center",
              }}
            >
              {/* Contenedor del robot con glow de fondo */}
              <div style={{ position: "relative" }}>
                {/* Anillo de glow exterior pulsante */}
                <div
                  style={{
                    position: "absolute",
                    inset: "-8px",
                    borderRadius: "50%",
                    background: gradient,
                    opacity: 0.15,
                    animation: "robotGlowRing 2.5s ease-in-out infinite",
                  }}
                />

                {/* Anillo medio */}
                <div
                  style={{
                    position: "absolute",
                    inset: "-4px",
                    borderRadius: "50%",
                    background: gradient,
                    opacity: 0.25,
                    animation: "robotGlowRing 2.5s ease-in-out infinite 0.3s",
                  }}
                />

                {/* Círculo principal con robot flotando */}
                <div
                  style={{
                    width: "72px",
                    height: "72px",
                    borderRadius: "50%",
                    background: gradient,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "32px",
                    position: "relative",
                    animation: "robotFloat 3s ease-in-out infinite",
                    boxShadow: `0 8px 32px hsl(${cssVar("--glow-primary")} / 0.4)`,
                  }}
                >
                  🤖
                </div>
              </div>

              {/* Texto con animación de entrada */}
              <div style={{ animation: "fadeInUp 0.6s ease-out forwards" }}>
                <p
                  style={{
                    color: `hsl(${cssVar("--foreground")})`,
                    fontSize: "14px",
                    fontWeight: 600,
                    margin: "0 0 4px 0",
                  }}
                >
                  ¡Hola! Soy Carmen.
                </p>
                <p
                  style={{
                    color: `hsl(${cssVar("--muted-foreground")})`,
                    fontSize: "12px",
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  ¿En qué puedo ayudarte hoy?
                </p>
              </div>

              {/* Sugerencias rápidas */}
            </div>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: msg.role === "user" ? "row-reverse" : "row",
                alignItems: "flex-end",
                gap: "8px",
                animation: "fadeInUp 0.3s ease-out forwards",
              }}
            >
              {msg.role === "bot" && (
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    background: gradient,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "10px",
                    color: "white",
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  C
                </div>
              )}
              <div
                style={{
                  maxWidth: "75%",
                  padding: "10px 14px",
                  borderRadius:
                    msg.role === "user"
                      ? "18px 18px 4px 18px"
                      : "18px 18px 18px 4px",
                  fontSize: "13px",
                  lineHeight: 1.5,
                  background:
                    msg.role === "user" ? gradient : `hsl(${cssVar("--card")})`,
                  color:
                    msg.role === "user"
                      ? "white"
                      : `hsl(${cssVar("--foreground")})`,
                  boxShadow:
                    msg.role === "user"
                      ? `0 2px 8px hsl(${cssVar("--glow-primary")} / 0.25)`
                      : "0 1px 4px rgba(0,0,0,0.08)",
                  border:
                    msg.role === "bot"
                      ? `1px solid hsl(${cssVar("--border")})`
                      : "none",
                }}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div
              style={{ display: "flex", alignItems: "flex-end", gap: "8px" }}
            >
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  background: gradient,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "10px",
                  color: "white",
                  fontWeight: 700,
                }}
              >
                C
              </div>
              <div
                style={{
                  background: `hsl(${cssVar("--card")})`,
                  border: `1px solid hsl(${cssVar("--border")})`,
                  borderRadius: "18px 18px 18px 4px",
                  padding: "12px 16px",
                  display: "flex",
                  gap: "4px",
                  alignItems: "center",
                }}
              >
                {[0, 150, 300].map((delay) => (
                  <div
                    key={delay}
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: `hsl(${cssVar("--muted-foreground")})`,
                      animation: `chatBounce 1s ${delay}ms infinite`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div
          style={{
            padding: "12px",
            background: `hsl(${cssVar("--background")})`,
            borderTop: `1px solid hsl(${cssVar("--border")})`,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: `hsl(${cssVar("--muted")})`,
              borderRadius: "14px",
              padding: "8px 8px 8px 14px",
              border: `1px solid hsl(${cssVar("--border")})`,
            }}
          >
            <input
              style={{
                flex: 1,
                border: "none",
                background: "transparent",
                outline: "none",
                fontSize: "13px",
                color: `hsl(${cssVar("--foreground")})`,
                minWidth: 0,
              }}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe un mensaje..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "10px",
                background:
                  loading || !input.trim()
                    ? `hsl(${cssVar("--muted")})`
                    : gradient,
                border: "none",
                cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "background 0.2s",
              }}
              aria-label="Enviar"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes robotFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }

        @keyframes robotGlowRing {
          0%, 100% { transform: scale(1);    opacity: 0.15; }
          50%       { transform: scale(1.15); opacity: 0.3;  }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0);    }
        }

        @keyframes chatBounce {
          0%, 100% { transform: translateY(0);   }
          50%       { transform: translateY(-5px); }
        }

        @keyframes statusPulse {
          0%, 100% { opacity: 1;   transform: scale(1);    }
          50%       { opacity: 0.6; transform: scale(1.3); }
        }
      `}</style>
    </>,
    document.body,
  );
}
