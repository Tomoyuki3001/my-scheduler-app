"use client";

import SignUpForm from "../components/SignUpForm";

export default function SignupPage() {
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
    const res = await fetch("/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, firstName, lastName }),
    });

    if (!res.ok) {
      console.error("Signup failed");
      return;
    }
    console.log("Signup successful");
  };

  return <SignUpForm onSubmit={handleSignUp} />;
}
