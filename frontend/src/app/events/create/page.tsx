"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateEventPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [message, setMessage] = useState("");
  const [showCancelModal, setShowCancelModal] = useState(false);

  const hasUnsavedChanges = title || description || eventDate || startTime || endTime;

  const combineDateTime = (date: string, time: string): string => {
    if (!date || !time) return "";
    const dateTime = new Date(`${date}T${time}`);
    return dateTime.toISOString();
  };

  const handleCancel = () => {
    if (hasUnsavedChanges) {
      setShowCancelModal(true);
    } else {
      router.push("/events");
    }
  };

  const handleConfirmCancel = () => {
    setShowCancelModal(false);
    router.push("/events");
  };

  const handleStay = () => {
    setShowCancelModal(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const start = combineDateTime(eventDate, startTime);
    const end = combineDateTime(eventDate, endTime);

    if (!start || !end) {
      setMessage("Please select both date and times");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/event/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title,
          description,
          start,
          end,
          userId: "507f1f77bcf86cd799439011",
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create events");
      }
      setMessage("Event created successfully!");
      setTitle("");
      setDescription("");
      setEventDate("");
      setStartTime("");
      setEndTime("");
    } catch {
      setMessage("Error create events");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">

      <main className="flex-grow flex flex-col items-center py-12 px-6">
        <div className="w-full max-w-4xl bg-white rounded-3xl shadow-sm border border-slate-100 p-10">

          <div className="flex justify-between items-center mb-10">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Create new event</h1>
            <button
              type="button"
              onClick={handleCancel}
              className="text-slate-400 hover:text-slate-600 bg-slate-50 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {message && (
              <div className={`p-4 rounded-2xl ${message.includes("success") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                {message}
              </div>
            )}

            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Product Launch Showcase"
                className="w-full border border-slate-200 rounded-2xl p-4 text-slate-700 placeholder:text-slate-300 focus:ring-2 focus:ring-blue-100 focus:border-[#1d63ed] outline-none transition-all"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Date</label>
                <div className="relative">
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full border border-slate-200 rounded-2xl p-4 text-sm bg-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    required
                  />
                  <svg className="w-4 h-4 absolute right-4 top-4.5 text-blue-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Start Time</label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full border border-slate-200 rounded-2xl p-4 text-sm bg-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">End Time</label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full border border-slate-200 rounded-2xl p-4 text-sm bg-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Upload Cover Images</label>

              <div className="border-2 border-dashed border-blue-100 rounded-3xl p-12 flex flex-col items-center justify-center bg-blue-50/20 group hover:border-[#1d63ed] transition-all cursor-pointer">
                <div className="bg-white p-4 rounded-full shadow-sm mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-[#1d63ed]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-blue-600">You can also drop your files here</p>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Description</label>
              <textarea
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the goals, agenda, or any special instructions for this event..."
                className="w-full border border-slate-200 rounded-2xl p-4 text-slate-700 placeholder:text-slate-300 focus:ring-2 focus:ring-blue-100 focus:border-[#1d63ed] outline-none transition-all resize-none"
                maxLength={2000}
              ></textarea>
              <p className="mt-2 text-[10px] text-slate-400 font-medium">Character limit: {description.length} / 2000</p>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-[#1d63ed] hover:bg-blue-700 text-white font-bold py-5 rounded-3xl shadow-xl shadow-blue-200 transition-all transform hover:-translate-y-1 active:scale-95"
              >
                Create event
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 animate-in zoom-in-95">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-amber-100 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-8 h-8 text-amber-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                />
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 text-center mb-3">
              Discard changes?
            </h2>
            <p className="text-slate-600 text-center mb-8">
              You have unsaved changes. Are you sure you want to leave? Your progress will be lost.
            </p>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={handleStay}
                className="flex-1 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl transition-colors"
              >
                Stay
              </button>
              <button
                type="button"
                onClick={handleConfirmCancel}
                className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl transition-colors"
              >
                Discard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
