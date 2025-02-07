// pages/login.tsx
import { useState } from "react";
import { useRouter } from "next/router";
import { login as loginService } from "../lib/auth";
import LoginForm from "../components/Auth/LoginForm";
import { getCookie, setCookie } from "cookies-next";
import setUserRole from '../components/common/Layout'

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const token = getCookie("accessToken");
  if (token) router.push("/");

  const handleSubmit = async (email: string, password: string) => {
    try {
      const { accessToken, user } = await loginService(email, password);
      setCookie("accessToken", accessToken);
      setCookie("userRole", user.role);
      setUserRole(user.role)
      router.push("/");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <LoginForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
