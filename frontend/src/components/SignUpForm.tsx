"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";

interface SignUpFormProps {
  onSubmit: (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => void;
}

const passwordChecks = {
  length: (p: string) => p.length >= 8,
  uppercase: (p: string) => /[A-Z]/.test(p),
  lowercase: (p: string) => /[a-z]/.test(p),
  number: (p: string) => /\d/.test(p),
  special: (p: string) => /[@$!%*?&]/.test(p),
};

export default function SignUpForm({ onSubmit }: SignUpFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <div className="flex-grow flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white overflow-y-auto">
          <div className="max-w-md w-full space-y-6 py-10">
            <div className="text-center md:text-left">
              <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                Create Account
              </h2>
              <p className="mt-2 text-slate-500">
                Join TimeFlow to start managing your events.
              </p>
            </div>

            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit({ firstName, lastName, email, password });
              }}
            >
              <div className="flex gap-4">
                <div className="relative">
                  <label className="absolute -top-2 left-4 bg-white px-1 text-xs font-semibold text-slate-500">
                    First Name
                  </label>
                  <div className="flex items-center border border-slate-200 rounded-2xl p-4 focus-within:border-blue-500 transition-all">
                    <input
                      type="text"
                      placeholder="John"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full outline-none text-slate-700 bg-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="absolute -top-2 left-4 bg-white px-1 text-xs font-semibold text-slate-500">
                    Last Name
                  </label>
                  <div className="flex items-center border border-slate-200 rounded-2xl p-4 focus-within:border-blue-500 transition-all">
                    <input
                      type="text"
                      placeholder="Doe"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full outline-none text-slate-700 bg-transparent"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="relative">
                <label className="absolute -top-2 left-4 bg-white px-1 text-xs font-semibold text-slate-500">
                  Email Address
                </label>
                <div className="flex items-center border border-slate-200 rounded-2xl p-4 focus-within:border-blue-500 transition-all">
                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full outline-none text-slate-700 bg-transparent"
                    required
                  />
                </div>
              </div>

              <div className="relative">
                <label className="absolute -top-2 left-4 bg-white px-1 text-xs font-semibold text-slate-500">
                  Create Password
                </label>
                <div className="flex items-center border border-slate-200 rounded-2xl p-4 focus-within:border-blue-500 transition-all">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full outline-none text-slate-700 bg-transparent"
                    required
                  />
                </div>
                <ul className="mt-2 space-y-1">
                  <li className="text-xs text-slate-500 flex items-center gap-2">
                    Password must be at least 8 characters long{" "}
                    {passwordChecks.length(password) && (
                      <Check className="w-4 h-4 text-green-500 shrink-0" />
                    )}
                  </li>
                  <li className="text-xs text-slate-500 flex items-center gap-2">
                    Password should contain at least one uppercase letter
                    {passwordChecks.uppercase(password) && (
                      <Check className="w-4 h-4 text-green-500 shrink-0" />
                    )}
                  </li>
                  <li className="text-xs text-slate-500 flex items-center gap-2">
                    Password should contain at least one lowercase letter
                    {passwordChecks.lowercase(password) && (
                      <Check className="w-4 h-4 text-green-500 shrink-0" />
                    )}
                  </li>
                  <li className="text-xs text-slate-500 flex items-center gap-2">
                    Password should contain at least one number
                    {passwordChecks.number(password) && (
                      <Check className="w-4 h-4 text-green-500 shrink-0" />
                    )}
                  </li>
                  <li className="text-xs text-slate-500 flex items-center gap-2">
                    Password should contain at least one special character
                    {passwordChecks.special(password) && (
                      <Check className="w-4 h-4 text-green-500 shrink-0" />
                    )}
                  </li>
                </ul>
              </div>

              <button
                type="submit"
                className="w-full bg-[#1d63ed] hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-100 transition-all transform hover:-translate-y-0.5"
              >
                Sign Up
              </button>

              <p className="text-center text-sm text-slate-500 font-medium pt-4">
                Already have an account?{" "}
                <Link
                  href="/pages/auth/login"
                  className="text-blue-600 font-bold hover:underline"
                >
                  Log in
                </Link>
              </p>
            </form>
          </div>
        </div>

        <div className="hidden md:flex w-1/2 bg-[#1d63ed] relative items-center justify-center p-12 text-white overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          ></div>

          <div className="relative z-10 max-w-md text-center">
            <div className="mb-8 inline-block p-4 bg-white/10 backdrop-blur-lg rounded-3xl">
              <svg
                className="w-16 h-16 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-3xl font-bold mb-4">Master your schedule.</h3>
            <p className="text-blue-100 text-lg">
              Join thousands of event organizers who use TimeFlow to keep their
              lives and business in sync.
            </p>

            <p className="mt-4 text-sm text-blue-200 uppercase tracking-widest font-bold">
              Trusted by planners worldwide
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
