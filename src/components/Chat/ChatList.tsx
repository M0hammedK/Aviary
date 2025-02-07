import { useEffect, useState } from "react";
import api from "../../lib/api"; // Your API instance
import Link from "next/link";

export default function ChatList() {
  const [chatRooms, setChatRooms] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserAndChats = async () => {
      try {
        // Fetch logged-in user details
        const userRes = await api.get("/auth/me"); // Ensure your backend has this route
        const currentUser = userRes.data;
        setUser(currentUser);

        // Fetch all chat rooms
        const { data } = await api.get("/chatRoom");

        // Filter chat rooms based on user role/ownership
        const filteredRooms = data.filter((room: any) => {
          return currentUser.role === "ADMIN" || room.ownerId === currentUser.id;
        });

        setChatRooms(filteredRooms);
      } catch (error) {
        console.error("Failed to fetch user or chat rooms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndChats();
  }, []);

  if (loading) return <p>Loading chat rooms...</p>;
  if (chatRooms.length === 0) return <p>No chat rooms available.</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Chat Rooms</h1>
      <ul>
        {chatRooms.map((room: any) => (
          <li key={room.id} className="mb-2">
            <Link href={`/chat/${room.id}`} className="text-blue-500 hover:underline">
              {room.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
