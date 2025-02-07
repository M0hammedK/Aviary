// components/Chat/ChatWindow.tsx
import { useEffect, useState } from "react";
import api from "../../lib/api";
import { Messages } from "../../types/types";
import Message from "./Message";

interface ChatWindowProps {
  roomId: number;
}

export default function ChatWindow({ roomId }: ChatWindowProps) {
  const [messages, setMessages] = useState<Messages[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const loadMessages = async () => {
        const { data } = await api.get(`/chatRoom/${roomId}/message`);
        setMessages(data);
    };
    loadMessages();
  }, [roomId]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
      const { data } = await api.post(`/chatRoom/${roomId}/message/add`, {
        content: newMessage,
      });

      setMessages([...messages, data]);
      setNewMessage("");
  };

  return (
    <div className="chat-window border p-4 rounded">
      <div className="messages mb-4">
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
      <form onSubmit={sendMessage} className="flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-grow p-2 border rounded-l"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-r">
          Send
        </button>
      </form>
    </div>
  );
}
