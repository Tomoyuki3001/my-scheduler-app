"use client";

import Link from "next/link";
import EventCard from "../../../components/EventCard";

export default function page() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Upcoming Events</h2>
          <p className="text-slate-500 mt-2">
            Discover and join the latest happenings.
          </p>
        </div>
        <Link
          href="/events"
          className="text-blue-600 font-medium hover:underline"
        >
          View all events →
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <EventCard />
        <EventCard />
      </div>
    </section>
  );
}
