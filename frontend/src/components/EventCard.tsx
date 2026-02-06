"use client";

import Link from "next/link";

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

interface EventCardProps {
  event?: EventType;
}

export default function EventCard({ event }: EventCardProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "TBD";
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (timeString?: string) => {
    if (!timeString) return "TBD";
    const time = new Date(timeString);
    return time.toLocaleString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        <img
          src={
            event?.image ||
            "https://img.freepik.com/free-vector/happy-tiny-business-people-dancing-having-fun-drinking-wine-corporate-party-team-building-activity-corporate-event-idea-concept-pinkish-coral-bluevector-isolated-illustration_335657-1414.jpg?semt=ais_hybrid&w=740"
          }
          alt={event?.title || "Event"}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-5">
        <h3 className="mt-2 text-lg font-bold text-slate-900 leading-tight">
          {event?.title || "Event Title"}
        </h3>
        <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
          {formatDate(event?.start)} <br />
          {formatTime(event?.start)} - {formatTime(event?.end)}
        </p>

        <button className="w-full mt-5 bg-[#1d63ed] hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors text-sm">
          <Link
            href={`/pages/events/${event?._id}`}
            className="font-medium hover:underline"
          >
            View Details
          </Link>
        </button>
      </div>
    </div>
  );
}
