"use client";

import { useState } from "react";

interface AuthFormProps {
  mode: "login" | "signup";
  onSubmit: (data: { email: string; password: string }) => void;
}

export default function AuthForm({ mode, onSubmit }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ email, password });
      }}
      className="max-w-md mx-auto p-6 border rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-2xl font-bold text-center">
        {mode === "login" ? "Login" : "Sign Up"}
      </h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        {mode === "login" ? "Log In" : "Sign Up"}
      </button>
    </form>
  );
}
