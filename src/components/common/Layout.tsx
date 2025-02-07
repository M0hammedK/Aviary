// components/common/Layout.tsx
import Link from "next/link";
import { useRouter } from "next/router";
import { deleteCookie, getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { logout as logoutService } from "../../lib/auth";
import Image from "next/image";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
      const token = getCookie("accessToken");
      const role = getCookie("userRole");
      setIsAuthenticated(!!token);
      setUserRole((role as string) || "");
  }, [children]);
  
  const handleLogout = async () => {
    try {
      await logoutService();
    } catch (error) {
      console.error("Logout error:", error);
    }
    // Delete the cookies and update state
    deleteCookie("accessToken");
    deleteCookie("userRole");
    setIsAuthenticated(false);
    setUserRole("");
    router.push("/login");
  };

  return (
    <div>
      <header className="bg-blue-500 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            <Image src={'/aviary.png'} alt="Aviary" width={100} height={0} />
          </Link>
          <nav>
            <ul className="flex space-x-4">
              {isAuthenticated ? (
                <>
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <Link href="/chat/create">Create Room</Link>
                  </li>
                  {userRole === "ADMIN" && (
                    <>
                      <li>
                        <Link href="/admin/users">Users</Link>
                      </li>
                      <li>
                        <Link href="/admin/chatRooms">Chat Rooms</Link>
                      </li>
                    </>
                  )}
                  <li>
                    <button onClick={handleLogout} className="hover:underline">
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href="/login">Login</Link>
                  </li>
                  <li>
                    <Link href="/register">Register</Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
      <main className="min-h-screen">{children}</main>
    </div>
  );
}
