"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex gap-4 p-4 bg-gray-800 text-white">
      <Link href="/">Home</Link>
      <Link href="/login">Login</Link>
      <Link href="/register">Register</Link>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/events">Events</Link>
    </nav>
  );
}
