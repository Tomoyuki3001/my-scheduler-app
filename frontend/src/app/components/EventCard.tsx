"use client";

import Link from "next/link";

interface EventType {
    _id: string;
    userId: string;
    title: string;
    description?: string;
    start: string;
    end: string;
}

interface EventCardProps {
    event?: EventType;
}

export default function EventCard({ event }: EventCardProps) {
    const formatDate = (dateString?: string) => {
        if (!dateString) return "TBD";
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    return (
        <div className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <div className="relative h-48 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?auto=format&fit=crop&w=800" alt={event?.title || "Event"} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <span className="absolute top-3 right-3 bg-blue-600/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">Active</span>
            </div>

            <div className="p-5">
                <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">{formatDate(event?.start)}</p>
                <h3 className="mt-2 text-lg font-bold text-slate-900 leading-tight">{event?.title || "Event Title"}</h3>
                <p className="mt-1 text-sm text-slate-500 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    {event?.description || "Location TBD"}
                </p>

                <button className="w-full mt-5 bg-[#1d63ed] hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors text-sm">
                    <Link href="/events/id" className="font-medium hover:underline">View Details</Link>
                </button>
            </div>
        </div>
    );
}