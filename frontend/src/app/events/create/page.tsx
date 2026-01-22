"use client";

import { useState } from "react";

export default function CreateEventPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/event/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Send cookies with request
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
      setStart("");
      setEnd("");
    } catch (err: unknown) {
      setMessage("Error create events");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">

      {/* Main Form Content */}
      <main className="flex-grow flex flex-col items-center py-12 px-6">
        <div className="w-full max-w-4xl bg-white rounded-3xl shadow-sm border border-slate-100 p-10">

          {/* Form Header */}
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Create new event</h1>
            <button className="text-slate-400 hover:text-slate-600 bg-slate-50 px-4 py-2 rounded-xl text-sm font-medium transition-colors">
              Cancel
            </button>
          </div>

          <form className="space-y-8">
            {/* Title Section */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Title</label>
              <input
                type="text"
                placeholder="e.g. Product Launch Showcase"
                className="w-full border border-slate-200 rounded-2xl p-4 text-slate-700 placeholder:text-slate-300 focus:ring-2 focus:ring-blue-100 focus:border-[#1d63ed] outline-none transition-all"
              />
            </div>

            {/* Date and Time Row */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Day</label>
                <div className="relative">
                  <input type="text" value="22 Jan 2026" readOnly className="w-full border border-slate-200 rounded-2xl p-4 text-sm bg-slate-50 cursor-pointer" />
                  <svg className="w-4 h-4 absolute right-4 top-4.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Hour</label>
                <select className="w-full border border-slate-200 rounded-2xl p-4 text-sm bg-white outline-none focus:border-blue-500">
                  <option>10 am</option>
                  <option>11 am</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Minute</label>
                <select className="w-full border border-slate-200 rounded-2xl p-4 text-sm bg-white outline-none focus:border-blue-500">
                  <option>00</option>
                  <option>15</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Duration</label>
                <select className="w-full border border-slate-200 rounded-2xl p-4 text-sm bg-white outline-none focus:border-blue-500">
                  <option>1h 30m</option>
                  <option>2h 00m</option>
                </select>
              </div>
            </div>

            {/* Upload Section */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Upload Cover Images</label>

              {/* Dropzone */}
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
                placeholder="Describe the goals, agenda, or any special instructions for this event..."
                className="w-full border border-slate-200 rounded-2xl p-4 text-slate-700 placeholder:text-slate-300 focus:ring-2 focus:ring-blue-100 focus:border-[#1d63ed] outline-none transition-all resize-none"
              ></textarea>
              <p className="mt-2 text-[10px] text-slate-400 font-medium">Character limit: 0 / 2000</p>
            </div>

            {/* Create Button */}
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
    </div>
  );
};
