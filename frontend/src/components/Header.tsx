"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkAuthStatus = () => {
    fetch("http://localhost:5000/api/users/status", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setIsLoggedIn(data.isLoggedIn))
      .catch(() => setIsLoggedIn(false));
  };

  useEffect(() => {
    checkAuthStatus();

    const handleFocus = () => checkAuthStatus();
    window.addEventListener("focus", handleFocus);

    const handleAuthChange = () => checkAuthStatus();
    window.addEventListener("auth-status-changed", handleAuthChange);

    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("auth-status-changed", handleAuthChange);
    };
  }, [pathname]);

  const handleCreateClick = () => {
    if (!isLoggedIn) {
      router.push("/pages/auth/login");
    } else {
      router.push("/pages/events/create");
    }
  };

  return (
    <header className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <span className="text-xl font-semibold">TimeFlow</span>
          </Link>

          <nav className="flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-medium hover:text-blue-400 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/pages/events"
              className="text-sm font-medium hover:text-blue-400 transition-colors"
            >
              Events
            </Link>
            <button
              onClick={handleCreateClick}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-2.5 rounded-lg text-sm font-medium transition-colors"
            >
              Create
            </button>
            {isLoggedIn ? (
              <Link
                href="/pages/user"
                className="p-2 rounded-full hover:bg-slate-800 transition-colors"
                title="Profile"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </Link>
            ) : (
              <Link
                href="/pages/auth/login"
                className="bg-blue-300 text-slate-900 px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
