"use client";

import { useEffect, useState } from "react";

interface EventType {
  _id: string;
  userId: string;
  title: string;
  description?: string;
  start: string;
  end: string;
}

export default function EventListPage() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/event")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      });
  }, []);

  const handleUpdate = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/events/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          id,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) {
      return;
    }

    await fetch(`http://localhost:5000/api/events/${id}`, { method: "DELETE" });
    setEvents(events.filter((event) => event._id !== id));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">Event List</h1>
      <ul className="space-y-3">
        {events.map((event) => (
          <li
            key={event._id}
            className="flex justify-between p-3 bg-gray-100 rounded"
          >
            <div>
              <h2 className="font-semibold">{event.title}</h2>
              <p>{event.description}</p>
            </div>
            <div className="space-x-2">
              <button
                className="bg-blue-600 text-white px-3 py-1 rounded"
                onClick={() => handleUpdate(event._id)}
              >
                Edit
              </button>
              <button
                className="bg-red-600 text-white px-3 py-1 rounded"
                onClick={() => handleDelete(event._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
