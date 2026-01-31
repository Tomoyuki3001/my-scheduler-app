"use client";

type Event = {
  _id: string;
  title: string;
  description: string;
  start: string;
  end: string;
  location: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
  };
};

type BookEventModalProps = {
  event: Event;
  onClose: () => void;
  onSuccess?: () => void;
};

export default function BookEventModal({
  event,
  onClose,
  onSuccess,
}: BookEventModalProps) {
  const handleBookEvent = async () => {
    const response = await fetch(
      `http://localhost:5000/api/bookings/${event._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          status: "booked",
          bookedDate: new Date(),
        }),
      }
    );
    if (response.ok) {
      onClose();
      onSuccess?.();
    }
  };
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };
  const formatTime = (timeString: string) => {
    return new Date(timeString).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };
  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg w-full max-w-md shadow-lg space-y-4">
        <h1 className="text-2xl font-bold">Book Event</h1>
        <div className="space-y-2">
          <label className="text-slate-500 text-sm">Event Title</label>
          <p className="text-slate-900 text-sm">{event.title}</p>
        </div>
        <div className="space-y-2">
          <label className="text-slate-500 text-sm">Event Date</label>
          <p className="text-slate-900 text-sm">
            {formatDate(event.start)} <br />
            {formatTime(event.start)} ~ {formatTime(event.end)}
          </p>
        </div>
        <div className="space-y-2">
          <label className="text-slate-500 text-sm">Event Location</label>
          <p className="text-slate-900 text-sm">
            {event.location.street}, {event.location.city},{" "}
            {event.location.state}, {event.location.postalCode}
          </p>
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md cursor-pointer"
            onClick={onClose}
          >
            Close
          </button>
          <button
            type="button"
            className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-md cursor-pointer"
            onClick={handleBookEvent}
          >
            Book Event
          </button>
        </div>
      </div>
    </div>
  );
}
