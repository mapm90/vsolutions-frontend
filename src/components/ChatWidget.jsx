import { useState } from "react";
import { apiFetch } from "@/pages/api/fetchapi";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const data = await apiFetch("/chat", {
        method: "POST",
        body: JSON.stringify({
          messages: [{ role: "user", content: input }],
        }),
      });

      console.log("ERROR OPENROUTER:", data.debug.error);
      if (data.reply) {
        setMessages((prev) => [...prev, { role: "bot", content: data.reply }]);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <button onClick={() => setOpen(!open)} style={styles.floatingButton}>
        💬
      </button>

      {open && (
        <div style={styles.chatBox}>
          <div style={styles.header}>Chat</div>

          <div style={styles.messages}>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={
                  msg.role === "user" ? styles.userBubble : styles.botBubble
                }
              >
                {msg.content}
              </div>
            ))}
          </div>

          <div style={styles.inputContainer}>
            <input
              style={styles.input}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe un mensaje..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button style={styles.sendButton} onClick={sendMessage}>
              Enviar
            </button>
          </div>
        </div>
      )}
    </>
  );
}

const styles = {
  floatingButton: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "56px",
    height: "56px",
    borderRadius: "50%",
    backgroundColor: "#25D366",
    color: "white",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    zIndex: 1000,
  },

  chatBox: {
    position: "fixed",
    bottom: "90px",
    right: "20px",
    width: "320px",
    height: "420px",
    backgroundColor: "#f7f7f7",
    borderRadius: "16px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    zIndex: 1000,
  },

  header: {
    padding: "12px",
    backgroundColor: "#25D366",
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

  messages: {
    flex: 1,
    padding: "12px",
    overflowY: "auto",
  },

  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C6",
    padding: "8px 12px",
    borderRadius: "14px 14px 0 14px",
    marginBottom: "8px",
    maxWidth: "80%",
  },

  botBubble: {
    alignSelf: "flex-start",
    backgroundColor: "white",
    padding: "8px 12px",
    borderRadius: "14px 14px 14px 0",
    marginBottom: "8px",
    maxWidth: "80%",
    boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
  },

  inputContainer: {
    display: "flex",
    padding: "8px",
    backgroundColor: "white",
    borderTop: "1px solid #ddd",
  },

  input: {
    flex: 1,
    padding: "8px",
    borderRadius: "20px",
    border: "1px solid #ddd",
    outline: "none",
  },

  sendButton: {
    marginLeft: "8px",
    backgroundColor: "#25D366",
    color: "white",
    border: "none",
    borderRadius: "20px",
    padding: "0 14px",
    cursor: "pointer",
  },
};
