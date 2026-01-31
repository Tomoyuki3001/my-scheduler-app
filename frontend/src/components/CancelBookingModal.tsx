"use client";

import { useRouter } from "next/navigation";

type Booking = {
  _id: string;
  eventId: string;
  userId: string;
  status: string;
  bookedDate: string;
};

type CancelBookingModalProps = {
  booking: Booking;
  onClose: () => void;
  onSuccess?: () => void;
};

export default function CancelBookingModal({
  booking,
  onClose,
  onSuccess,
}: CancelBookingModalProps) {
  const router = useRouter();

  const handleCancelBooking = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/bookings/${booking._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            status: "cancelled",
          }),
        }
      );
      if (!response.ok) throw new Error("Failed to cancel booking");
      onClose();
      onSuccess?.();
      router.push(`/pages/events/${booking.eventId}`);
    } catch (error) {
      console.error("Error canceling booking:", error);
      return;
    }
  };
  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg w-full max-w-md shadow-lg space-y-4">
        <h1 className="text-2xl font-bold">Cancel Booking</h1>
        <p className="text-slate-900 text-sm">
          Are you sure you want to cancel this booking?
        </p>
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
            onClick={handleCancelBooking}
          >
            Cancel Booking
          </button>
        </div>
      </div>
    </div>
  );
}
