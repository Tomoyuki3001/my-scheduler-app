"use client";

import { useState } from "react";

interface SignUpFormProps {
  onSubmit: (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => void;
}

export default function SignUpForm({ onSubmit }: SignUpFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ email, password, firstName, lastName });
      }}
      className="max-w-md mx-auto p-6 border rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-2xl font-bold text-center">Sign Up</h2>
      <input
        type="name"
        placeholder="First name"
        value={email}
        onChange={(e) => setFirstName(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="name"
        placeholder="Last name"
        value={email}
        onChange={(e) => setLastName(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
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
        Sign Up
      </button>
    </form>
  );
}
