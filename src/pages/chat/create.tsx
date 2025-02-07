// pages/chat/create.tsx
import { useState } from "react";
import { useRouter } from "next/router";
import ProtectedRoute from "../../components/common/ProtectedRoute";
import api from "../../lib/api";

export default function CreateChatRoomPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: any = { name };
      if (password.trim()) payload.password = password;
      else payload.password = null;
      // Note: The server endpoint is "/api/chatRoom/create"
      const { data } = await api.post("/chatRoom/create", payload);
      router.push(`/chat/${data.id}`);
    } catch (err) {
      setError("Failed to create chat room");
    }
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">Create Chat Room</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
          <div>
            <label className="block mb-1">Room Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Password (optional)</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Create Room
          </button>
        </form>
      </div>
    </ProtectedRoute>
  );
}
