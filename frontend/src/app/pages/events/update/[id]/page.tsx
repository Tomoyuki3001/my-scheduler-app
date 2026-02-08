"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

interface Event {
  _id: string;
  userId: string;
  title: string;
  category: string;
  description?: string;
  start: string;
  end: string;
  location: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
  };
}

export default function UpdateEventPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [message, setMessage] = useState("");
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [events, setEvents] = useState<Event | null>(null);

  const hasUnsavedChanges =
    title ||
    category ||
    description ||
    eventDate ||
    startTime ||
    endTime ||
    street ||
    city ||
    state ||
    postalCode;

  const combineDateTime = (date: string, time: string): string => {
    if (!date || !time) return "";
    const dateTime = new Date(`${date}T${time}`);
    return dateTime.toISOString();
  };

  const isoToDateInput = (iso: string): string => {
    const d = new Date(iso);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
      2,
      "0",
    )}-${String(d.getDate()).padStart(2, "0")}`;
  };

  const isoToTimeInput = (iso: string): string => {
    const d = new Date(iso);
    return `${String(d.getHours()).padStart(2, "0")}:${String(
      d.getMinutes(),
    ).padStart(2, "0")}`;
  };

  const today = (() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
      2,
      "0",
    )}-${String(d.getDate()).padStart(2, "0")}`;
  })();

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

    const now = new Date();
    const startDate = new Date(events?.start ?? "");
    const endDate = new Date(events?.end ?? "");

    if (startDate < now) {
      setMessage("Start date and time cannot be in the past");
      return;
    }
    if (endDate < now) {
      setMessage("End date and time cannot be in the past");
      return;
    }
    if (endDate < startDate) {
      setMessage("End time should be after start time");
      return;
    }

    if (!title) {
      setMessage("Title is required");
      return;
    }
    if (!category) {
      setMessage("Category is required");
      return;
    }
    if (!eventDate) {
      setMessage("Date is required");
      return;
    }
    if (!startTime) {
      setMessage("Start time is required");
      return;
    }
    if (!endTime) {
      setMessage("End time is required");
      return;
    }
    if (!street) {
      setMessage("Street is required");
      return;
    }
    if (!city) {
      setMessage("City is required");
      return;
    }
    if (!state) {
      setMessage("State is required");
      return;
    }
    if (!postalCode) {
      setMessage("Postal code is required");
      return;
    }
    if (!description) {
      setMessage("Description is required");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/events/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title,
          category,
          description,
          start: combineDateTime(eventDate, startTime),
          end: combineDateTime(eventDate, endTime),
          location: {
            street,
            city,
            state,
            postalCode,
          },
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        setMessage(data.error);
        return;
      }
      setMessage("Event updated successfully");
      router.push("/pages/events");
    } catch (err: unknown) {
      setMessage(
        `Failed to update event: ${
          err instanceof Error ? err.message : "Unknown error"
        }`,
      );
      return;
    }
  };

  useEffect(() => {
    fetch(`http://localhost:5000/api/events/${id}`, {
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setEvents(data.data as Event);
        setTitle(data.title);
        setCategory(data.category);
        setDescription(data.description ?? "");
        setEventDate(isoToDateInput(data.start));
        setStartTime(isoToTimeInput(data.start));
        setEndTime(isoToTimeInput(data.end));
        setStreet(data.location.street);
        setCity(data.location.city);
        setState(data.location.state);
        setPostalCode(data.location.postalCode);
      })
      .catch((err) => {
        console.log("Error fetching events", err);
        setEvents(null);
      });
  }, [id]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <main className="flex-grow flex flex-col items-center py-12 px-6">
        <div className="w-full max-w-4xl bg-white rounded-3xl shadow-sm border border-slate-100 p-10">
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Update event
            </h1>
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
              <div
                className={`p-4 rounded-2xl ${
                  message.includes("success")
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {message}
              </div>
            )}

            <div>
              <label className="block text-[14px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Product Launch Showcase"
                className="w-full border border-slate-200 rounded-2xl p-4 text-slate-700 placeholder:text-slate-300 focus:ring-2 focus:ring-blue-100 focus:border-[#1d63ed] outline-none transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-[14px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                Category
              </label>
              <select
                defaultValue={events?.category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-1/3 border border-slate-200 rounded-2xl p-4 text-sm bg-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                required
              >
                <option value="concerts">Concerts</option>
                <option value="sports">Sports</option>
                <option value="comedy">Comedy</option>
                <option value="music-shows">Music & Shows</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-[14px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    min={today}
                    className="w-full border border-slate-200 rounded-2xl p-4 text-sm bg-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    required
                  />
                  <svg
                    className="w-4 h-4 absolute right-4 top-4.5 text-blue-500 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>

              <div>
                <label className="block text-[14px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Start Time
                </label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full border border-slate-200 rounded-2xl p-4 text-sm bg-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  required
                />
              </div>

              <div>
                <label className="block text-[14px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                  End Time
                </label>
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
              <label className="block text-[14px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                Location
              </label>
              <div className="mb-4">
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Street
                </label>
                <input
                  type="text"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder="e.g. 123 Main Street"
                  className="w-full border border-slate-200 rounded-2xl p-4 text-slate-700 placeholder:text-slate-300 focus:ring-2 focus:ring-blue-100 focus:border-[#1d63ed] outline-none transition-all"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                    City
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Vancouver"
                    className="w-full border border-slate-200 rounded-2xl p-4 text-slate-700 placeholder:text-slate-300 focus:ring-2 focus:ring-blue-100 focus:border-[#1d63ed] outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                    State
                  </label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="e.g. BC"
                    className="w-full border border-slate-200 rounded-2xl p-4 text-slate-700 placeholder:text-slate-300 focus:ring-2 focus:ring-blue-100 focus:border-[#1d63ed] outline-none transition-all"
                    required
                  />
                </div>
              </div>
              <div className="max-w-1/3">
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Postal Code
                </label>
                <input
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="e.g. A1B 2C3"
                  className="w-full border border-slate-200 rounded-2xl p-4 text-slate-700 placeholder:text-slate-300 focus:ring-2 focus:ring-blue-100 focus:border-[#1d63ed] outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[14px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                Description
              </label>
              <textarea
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the goals, agenda, or any special instructions for this event..."
                className="w-full border border-slate-200 rounded-2xl p-4 text-slate-700 placeholder:text-slate-300 focus:ring-2 focus:ring-blue-100 focus:border-[#1d63ed] outline-none transition-all resize-none"
                maxLength={2000}
                required
              ></textarea>
              <p className="mt-2 text-[10px] text-slate-400 font-medium">
                Character limit: {description.length} / 2000
              </p>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-[#1d63ed] hover:bg-blue-700 text-white font-bold py-5 rounded-3xl shadow-xl shadow-blue-200 transition-all transform hover:-translate-y-1 active:scale-95"
              >
                Update event
              </button>
            </div>
          </form>
        </div>
      </main>

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
              You have unsaved changes. Are you sure you want to leave? Your
              progress will be lost.
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
}
