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
          <div style={styles.messages}>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={
                  msg.role === "user" ? styles.userMessage : styles.botMessage
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
              placeholder="Escribe tu mensaje..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>Enviar</button>
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
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
    zIndex: 1000,
  },
  chatBox: {
    position: "fixed",
    bottom: "90px",
    right: "20px",
    width: "300px",
    height: "400px",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    zIndex: 1000,
  },
  messages: {
    flex: 1,
    padding: "10px",
    overflowY: "auto",
  },
  userMessage: {
    textAlign: "right",
    marginBottom: "8px",
    backgroundColor: "#DCF8C6",
    padding: "6px",
    borderRadius: "8px",
  },
  botMessage: {
    textAlign: "left",
    marginBottom: "8px",
    backgroundColor: "#f1f1f1",
    padding: "6px",
    borderRadius: "8px",
  },
  inputContainer: {
    display: "flex",
    borderTop: "1px solid #ccc",
  },
  input: {
    flex: 1,
    padding: "8px",
    border: "none",
    outline: "none",
  },
};
