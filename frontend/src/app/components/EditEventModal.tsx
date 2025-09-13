"use client";

import { useState } from "react";

type EditEventModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    id: string,
    updatedData: {
      title: string;
      description?: string;
      start: string;
      end: string;
    }
  ) => void;
  event: {
    _id: string;
    userId: string;
    title: string;
    description?: string;
    start: string;
    end: string;
  } | null;
};

export default function EditEventModal({
  isOpen,
  onClose,
  onSave,
  event,
}: EditEventModalProps) {
  const formatDateTimeLocal = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16);
  };

  console.log("event", event);
  const [title, setTitle] = useState(event?.title);
  const [description, setDescription] = useState(event?.description);
  const [start, setStart] = useState(
    event?.start ? formatDateTimeLocal(event.start) : ""
  );
  const [end, setEnd] = useState(
    event?.end ? formatDateTimeLocal(event.end) : ""
  );

  console.log("title", title);
  if (!isOpen || !event) return null;

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     const res = await fetch(`http://localhost:5000/api/event/${id}`, {
  //       method: "PUT",
  //       body: JSON.stringify({}),
  //     });

  //     if (!res.ok) {
  //       throw new Error("Failed to update");
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   window.location.reload();
  // };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(event._id, { title, description, start, end });
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
                className="px-4 py-2 border rounded"
                onClick={() => onClose()}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded"
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
