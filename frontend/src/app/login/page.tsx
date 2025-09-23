"use client";

import Cookies from "js-cookie";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
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
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error("Login failed");
      }

      const data = await res.json();
      Cookies.set("token", data.token, { expires: 7 });

      console.log("Login successful");
    } catch (err) {
      console.log("error", err);
    }
  };

  return <LoginForm onSubmit={handleLogin} />;
}
