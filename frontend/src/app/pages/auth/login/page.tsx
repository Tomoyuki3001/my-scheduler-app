"use client";

import { useRouter } from "next/navigation";
import LoginForm from "../../../../components/LoginForm";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Login failed");
      }

      window.dispatchEvent(new Event("auth-status-changed"));
      router.push("/pages/profile");
    } catch (err) {
      console.log("Login error:", err);
      setErrorMessage((err as Error).message || "Login failed");
    }
  };

  return <LoginForm onSubmit={handleLogin} errorMessage={errorMessage} />;
}
