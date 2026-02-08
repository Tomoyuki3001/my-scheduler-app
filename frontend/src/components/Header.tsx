"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleFocus = () => checkAuthStatus();
    window.addEventListener("focus", handleFocus);

    const handleAuthChange = () => checkAuthStatus();
    window.addEventListener("auth-status-changed", handleAuthChange);

    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("auth-status-changed", handleAuthChange);
    };
  }, []);

  const handleCreateClick = () => {
    if (!isLoggedIn) {
      router.push("/pages/auth/login");
    } else {
      router.push("/pages/events/create");
    }
  };

  return (
    <header className="bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <span className="text-xl font-semibold">TimeFlow</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
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

          <button
            type="button"
            className="md:hidden p-2 rounded-lg hover:bg-slate-800 transition-colors"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
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
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            ) : (
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
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu overlay (dropdown style – floats over content) */}
      {mobileMenuOpen && (
        <>
          <button
            type="button"
            className="md:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          />
          <nav
            className="md:hidden absolute left-0 right-0 top-full z-50 bg-slate-900 border-t border-slate-700 shadow-xl flex flex-col gap-1 px-6 py-4"
            aria-label="Mobile navigation"
          >
            <Link
              href="/"
              className="text-sm font-medium hover:text-blue-400 hover:bg-slate-800 transition-colors py-3 px-3 rounded-lg -mx-3"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/pages/events"
              className="text-sm font-medium hover:text-blue-400 hover:bg-slate-800 transition-colors py-3 px-3 rounded-lg -mx-3"
              onClick={() => setMobileMenuOpen(false)}
            >
              Events
            </Link>
            <button
              onClick={() => {
                handleCreateClick();
                setMobileMenuOpen(false);
              }}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-2.5 rounded-lg text-sm font-medium transition-colors w-fit mt-2"
            >
              Create
            </button>
            {isLoggedIn ? (
              <Link
                href="/pages/user"
                className="text-sm font-medium hover:text-blue-400 hover:bg-slate-800 transition-colors py-3 px-3 rounded-lg -mx-3 flex items-center gap-2"
                title="Profile"
                onClick={() => setMobileMenuOpen(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
                Profile
              </Link>
            ) : (
              <Link
                href="/pages/auth/login"
                className="bg-blue-300 text-slate-900 px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors w-fit mt-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </nav>
        </>
      )}
    </header>
  );
}
