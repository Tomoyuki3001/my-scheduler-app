"use client";

import AuthForm from "../components/AuthForm";

export default function SignupPage() {
  const handleSignup = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      console.error("Signup failed");
      return;
    }
    console.log("Signup successful");
  };

  return <AuthForm mode="signup" onSubmit={handleSignup} />;
}
