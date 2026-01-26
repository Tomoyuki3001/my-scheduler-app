"use client";

import { useRouter } from "next/navigation";
import SignUpForm from "../components/SignUpForm";

export default function SignupPage() {
  const router = useRouter();

  const handleSignUp = async ({
    email,
    password,
    firstName,
    lastName,
  }: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => {
    try {
      const res = await fetch("http://localhost:5000/api/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password, firstName, lastName }),
      });

      if (!res.ok) {
        console.error("Signup failed");
        return;
      }

      const data = await res.json();
      console.log("User created successfully");

      // Dispatch event to notify Header to refresh auth status
      window.dispatchEvent(new Event('auth-status-changed'));

      router.push("/events");
    } catch (err) {
      console.error("Signup error:", err);
    }
  };

  return <SignUpForm onSubmit={handleSignUp} />;
}
