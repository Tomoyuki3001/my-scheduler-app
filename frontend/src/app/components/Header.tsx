'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
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
              href="/events"
              className="text-sm font-medium hover:text-blue-400 transition-colors"
            >
              Events
            </Link>
            <Link
              href="/events/create"
              className="bg-blue-600 hover:bg-blue-700 px-6 py-2.5 rounded-lg text-sm font-medium transition-colors"
            >
              Create
            </Link>
            <Link
              href="/signup"
              className="bg-blue-300 px-6 py-2.5 rounded-lg text-sm font-medium"
            >
              Sign up
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
