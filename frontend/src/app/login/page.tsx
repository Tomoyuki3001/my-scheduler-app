"use client";

import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  const handleLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const res = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      console.error("Login failed");
      return;
    }
    console.log("Login successful");
  };

  return <LoginForm onSubmit={handleLogin} />;
}
