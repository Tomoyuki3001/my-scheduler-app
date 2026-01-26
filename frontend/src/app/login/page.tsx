"use client";

import { useRouter } from "next/navigation";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const res = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error("Login failed");
      }

      window.dispatchEvent(new Event('auth-status-changed'));
      router.push("/events");
    } catch (err) {
      console.log("error", err);
    }
  };

  return <LoginForm onSubmit={handleLogin} />;
}
