"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import EventCard from "../../../components/EventCard";
import { useRouter } from "next/navigation";

interface EventType {
  _id: string;
  userId: string;
  title: string;
  description?: string;
  start: string;
  end: string;
  location: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
  };
  image: string;
}

const categories = [
  "All Events",
  "Concerts",
  "Sports",
  "Comedy",
  "Musical & Show",
];

interface InterfaceUser {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
}

export default function DashboardPage() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [user, setUser] = useState<InterfaceUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:5000/api/events", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setEvents(Array.isArray(data) ? data : []);
      })
      .catch(() => setEvents([]));
  }, []);

  const now = new Date();
  const sortedByStart = [...events].sort(
    (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
  );

  const allEvents = sortedByStart.slice(0, 12);

  const upcomingEvents = sortedByStart
    .filter((event) => new Date(event.start) >= now)
    .slice(0, 5);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "TBD";
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTimeRange = (startString?: string, endString?: string) => {
    if (!startString || !endString) return "Time TBD";
    const start = new Date(startString);
    const end = new Date(endString);
    const formatOptions: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
    return `${start.toLocaleTimeString(
      "en-US",
      formatOptions
    )} - ${end.toLocaleTimeString("en-US", formatOptions)}`;
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/users/me", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      });
  }, []);

  return (
    <section className="space-y-8">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
          Welcome back
        </p>
        <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
          Find your next event
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Browse categories, see popular events, and check what&apos;s coming up
          soon.
        </p>
      </header>

      <div className="flex flex-col gap-4 md:flex-row md:gap-6">
        <aside className="space-y-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 md:w-40 md:flex-none">
          <h2 className="text-sm font-semibold text-slate-800">Categories</h2>
          <ul className="space-y-1 text-sm">
            {categories.map((category, index) => (
              <li key={category}>
                <button
                  type="button"
                  className={`flex items-center justify-between rounded-lg px-2.5 py-1.5 text-left transition ${
                    index === 0
                      ? "bg-blue-50 font-semibold text-blue-700"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <span>{category}</span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <section className="space-y-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 md:flex-1">
          <h2 className="text-sm font-semibold text-slate-800">All Events</h2>

          {allEvents.length > 0 && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {allEvents.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          )}
          <div className="flex justify-end text-sm font-medium text-blue-600 hover:text-blue-700">
            <Link href="/pages/events" className="hover:underline">
              See all events →
            </Link>
          </div>
        </section>

        <aside className="space-y-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 md:max-w-50">
          <header className="mb-1 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-slate-800 mb-2">
                Upcoming Events
              </h2>
              <p className="text-[0.7rem] text-slate-500">
                Next {upcomingEvents.length} on your calendar
              </p>
            </div>
          </header>

          {user ? (
            <div>Logged in</div>
          ) : (
            <div className="flex flex-col gap-2">
              <p className="text-xs text-slate-500 mb-4">
                Please log in to see your upcoming events.
              </p>
              <button
                type="button"
                onClick={() => {
                  router.push("/pages/auth/login");
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded-md w-fit"
              >
                Login
              </button>
            </div>
          )}

          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <article
                key={event._id}
                className="rounded-xl bg-slate-50 p-3 shadow-sm ring-1 ring-slate-200"
              >
                <p className="text-[0.7rem] font-medium uppercase tracking-wide text-slate-500">
                  {formatDate(event.start)}
                </p>
                <h3 className="mt-1 text-sm font-semibold text-slate-900">
                  {event.title}
                </h3>
                <p className="mt-0.5 text-xs text-slate-500">
                  {formatTimeRange(event.start, event.end)}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {event.location.city}, {event.location.state}
                </p>

                <Link
                  href={`/pages/events/${event._id}`}
                  className="mt-2 inline-flex text-xs font-semibold text-blue-600 hover:text-blue-700"
                >
                  View details →
                </Link>
              </article>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
