import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import ChatWindow from "../../components/Chat/ChatWindow";
import ProtectedRoute from "../../components/common/ProtectedRoute";
import api from "@/lib/api";

export default function ChatRoomPage() {
  const router = useRouter();
  const { roomId } = router.query;
  const [chatRoom, setChatRoom] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!roomId) return;

    const fetchChatRoom = async () => {
      try {
        const { data } = await api.get(`/chatRoom/${roomId}`);
        setChatRoom(data);
      } catch (error) {
        console.error("Failed to fetch chat room:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChatRoom();
  }, [roomId]);

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-6">
        {loading ? (
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
        ) : (
          <h1 className="text-2xl font-bold mb-4">{chatRoom?.name || "Chat Room"}</h1>
        )}
        {roomId && <ChatWindow roomId={Number(roomId)} />}
      </div>
    </ProtectedRoute>
  );
}
