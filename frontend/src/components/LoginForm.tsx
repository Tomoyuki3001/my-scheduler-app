"use client";

import { useState } from "react";
import Link from "next/link";

interface LoginFormProps {
  onSubmit: (data: { email: string; password: string }) => void;
  errorMessage: string;
}

export default function LoginForm({ onSubmit, errorMessage }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <div className="flex-grow flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center md:text-left">
              <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                Welcome Back!!
              </h2>
              <p className="mt-2 text-slate-500">
                Please enter your details to sign in.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit({ email, password });
              }}
              className="mt-8 space-y-6"
            >
              <div className="space-y-4">
                <div className="relative">
                  <label className="absolute -top-2 left-4 bg-white px-1 text-xs font-semibold text-slate-500">
                    Email
                  </label>
                  <div className="flex items-center border border-slate-200 rounded-2xl p-4 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                    <svg
                      className="w-5 h-5 text-slate-400 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                    <input
                      type="email"
                      placeholder="email@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full outline-none text-slate-700 bg-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="absolute -top-2 left-4 bg-white px-1 text-xs font-semibold text-slate-500">
                    Password
                  </label>
                  <div className="flex items-center border border-slate-200 rounded-2xl p-4 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                    <svg
                      className="w-5 h-5 text-slate-400 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full outline-none text-slate-700 bg-transparent"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="text-slate-400 hover:text-slate-600 shrink-0"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878a4.5 4.5 0 106.262 6.262M4.5 4.5a10 10 0 1114.5 14.5"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {errorMessage && (
                <p className="text-red-500 text-sm">
                  Email or password is incorrect
                </p>
              )}
              <button
                type="submit"
                className="w-full bg-[#1d63ed] hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 transition-all transform hover:-translate-y-0.5"
              >
                Login
              </button>

              <p className="text-center text-sm text-slate-500 font-medium mt-6">
                Don’t have an account?{" "}
                <Link
                  href="/pages/auth/signup"
                  className="text-blue-600 font-bold hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>

        <div className="hidden md:flex w-1/2 bg-[#1d63ed] relative overflow-hidden items-center justify-center p-12">
          <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

          <div className="relative z-10 w-full max-w-lg aspect-square rounded-3xl overflow-hidden shadow-2xl rotate-3">
            <img
              src="https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&q=80&w=1000"
              className="w-full h-full object-cover"
              alt="Time Management"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
