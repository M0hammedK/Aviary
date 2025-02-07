// pages/admin/chat-rooms.tsx
import { useEffect, useState } from "react";
import api from "../../lib/api";
import ProtectedRoute from "../../components/common/ProtectedRoute";
import Link from "next/link";

export default function AdminChatRoomsPage() {
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    const loadChatRooms = async () => {
      const { data } = await api.get("/chatRoom");
      setChatRooms(data);
    };
    loadChatRooms();
  }, []);

  return (
    <ProtectedRoute adminOnly>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">Chat Rooms</h1>
        <ul>
          {chatRooms.map((room: any) => (
            <li key={room.id} className="mb-2">
              <Link
                href={`/chat/${room.id}`}
                className="text-blue-500 hover:underline"
              >
                {room.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </ProtectedRoute>
  );
}
