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
    const res = await fetch("http://localhost:5000/api/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, firstName, lastName }),
    });

    console.log("res", res);
    if (!res.ok) {
      console.error("Signup failed");
      return;
    }
    console.log("Signup successful");
  };

  return <SignUpForm onSubmit={handleSignUp} />;
}
