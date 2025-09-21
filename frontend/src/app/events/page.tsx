"use client";

import { useEffect, useState } from "react";
import EditEventModal from "../components/EditEventModal";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);

  const handleEditClick = (event: EventType) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/event")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      });
  }, []);

  const handleUpdate = async (event: EventType) => {
    try {
      const res = await fetch(`http://localhost:5000/api/event/${event._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });

      if (!res.ok) {
        throw new Error("Failed to update");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) {
      return;
    }

    await fetch(`http://localhost:5000/api/event/${id}`, { method: "DELETE" });
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
                className="bg-blue-600 text-white px-3 py-1 rounded cursor-pointer"
                onClick={() => handleEditClick(event)}
              >
                Edit
              </button>
              <button
                className="bg-red-600 text-white px-3 py-1 rounded cursor-pointer"
                onClick={() => handleDelete(event._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {selectedEvent && (
        <EditEventModal
          event={selectedEvent}
          onSave={handleUpdate}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
