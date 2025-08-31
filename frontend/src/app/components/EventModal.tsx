import { useState } from "react";

interface EventType {
  _id: string;
  userId: string;
  title: string;
  description?: string;
  start: string;
  end: string;
}

export default function EventItem({ event }: { event: EventType }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const handleSubmit = async (e: React.FormEvent, id: string) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/event/${id}`, {
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
    }
    setOpen(false);
    window.location.reload();
  };

  return (
    <div className="flex justify-between items-center p-2 border-b">
      <span>{event.title}</span>
      <button
        onClick={() => setOpen(true)}
        className="text-sm text-blue-600 underline"
      >
        Edit
      </button>

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-lg font-bold mb-4">Edit Event</h2>
            <form
              onSubmit={(e) => handleSubmit(e, event._id)}
              className="flex flex-col gap-4"
            >
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
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 border rounded"
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
      )}
    </div>
  );
}
