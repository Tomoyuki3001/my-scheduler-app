"use client";

import { useState, useEffect } from "react";

type Event = {
  _id: string;
  userId: string;
  title: string;
  description?: string;
  start: string;
  end: string;
};

type EditEventModalProps = {
  event: Event;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedEvent: Event) => void;
};

export default function EditEventModal({
  event,
  isOpen,
  onClose,
  onSave,
}: EditEventModalProps) {
  const formatDateTimeLocal = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16);
  };

  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const [start, setStart] = useState(formatDateTimeLocal(event.start));
  const [end, setEnd] = useState(formatDateTimeLocal(event.end));

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDescription(event.description);
      setStart(formatDateTimeLocal(event.start));
      setEnd(formatDateTimeLocal(event.end));
    }
  }, [event]);

  if (!isOpen || !event) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...event, title, description, start, end });
    onClose();
  };

  return (
    <div className="flex justify-between items-center p-2">
      <div className="fixed inset-0 flex items-center justify-center bg-black/75 z-50">
        <div className="bg-white p-6 rounded-lg w-96 shadow-xl">
          <h2 className="text-xl font-semibold mb-4">Edit Event</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 rounded"
              required
            />

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-2 rounded"
            />

            <input
              type="datetime-local"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="border p-2 rounded"
              required
            />

            <input
              type="datetime-local"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              className="border p-2 rounded"
              required
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="px-4 py-2 border rounded cursor-pointer"
                onClick={() => onClose()}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
