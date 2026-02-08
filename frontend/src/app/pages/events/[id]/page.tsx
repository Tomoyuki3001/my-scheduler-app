"use client";

import { useCallback, useEffect, useState } from "react";
import BookEventModal from "../../../../components/BookEventModal";
import CancelBookingModal from "../../../../components/CancelBookingModal";

interface Event {
  _id: string;
  title: string;
  category: string;
  description: string;
  start: string;
  end: string;
  location: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
  };
  image: string;
}

interface Booking {
  _id: string;
  eventId: string;
  userId: string;
  status: string;
  bookedDate: string;
}

export default function Page(params: { params: { id: string } }) {
  const { id } = params.params;
  const [event, setEvent] = useState<Event | null>(null);
  const [isBookEventModalOpen, setIsBookEventModalOpen] = useState(false);
  const [isCancelBookingModalOpen, setIsCancelBookingModalOpen] =
    useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isBooked, setIsBooked] = useState<Booking | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      const response = await fetch(`http://localhost:5000/api/events/${id}`, {
        credentials: "include",
      });
      const data = await response.json();
      setEvent(data);
    };
    fetchEvent();
  }, [id, isBooked]);

  useEffect(() => {
    const fetchUserLoggedInStatus = async () => {
      const response = await fetch("http://localhost:5000/api/users/status", {
        credentials: "include",
      });
      const data = await response.json();
      setIsUserLoggedIn(data.isLoggedIn ?? false);
    };
    fetchUserLoggedInStatus();
  }, []);

  const fetchBookingData = useCallback(async () => {
    if (!event?._id) return;
    const response = await fetch(
      `http://localhost:5000/api/bookings/${event._id}`,
      { credentials: "include" },
    );
    const data = await response.json();
    if (response.ok && data.data) {
      setIsBooked(data.data as Booking);
    } else {
      setIsBooked(null);
    }
  }, [event?._id]);

  useEffect(() => {
    if (!isUserLoggedIn || !event?._id) return;
    fetchBookingData();
  }, [isUserLoggedIn, event?._id, fetchBookingData]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "TBD";
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (timeString?: string) => {
    if (!timeString) return "TBD";
    const time = new Date(timeString);
    return time.toLocaleString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const openBookEventModal = () => {
    setIsBookEventModalOpen(true);
  };

  const openCancelBookingModal = () => {
    setIsCancelBookingModalOpen(true);
  };

  return (
    <div className="max-w-2xl my-10 mx-auto bg-gray-100 min-h-screen shadow-sm pb-10">
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        {event?.image && (
          <img
            src={event?.image}
            alt="Event Header"
            className="w-full h-full object-cover"
          />
        )}
        else
        {
          <img
            src="https://img.freepik.com/free-vector/happy-tiny-business-people-dancing-having-fun-drinking-wine-corporate-party-team-building-activity-corporate-event-idea-concept-pinkish-coral-bluevector-isolated-illustration_335657-1414.jpg?semt=ais_hybrid&w=740"
            alt="Event Header"
            className="w-full h-full object-cover"
          />
        }
      </div>

      <div className="mt-8 px-6 flex justify-between items-center">
        <p className="text-slate-900 text-2xl font-bold tracking-wide">
          {event?.title}
        </p>
      </div>

      <div className="px-6 mt-2">
        <label className="text-slate-500 text-md mb-2">Category:</label>
        <p className="w-fit text-sm tracking-wide bg-blue-500 text-white px-4 py-2 rounded-full">
          {event?.category}
        </p>
      </div>

      <div className="px-6 mt-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="mb-4">
              <label className="text-slate-500 text-md mb-2">Date:</label>
              <p className="text-slate-900 font-bold text-md tracking-wide">
                {formatDate(event?.start)} <br />
                {formatTime(event?.start)} - {formatTime(event?.end)}
              </p>
            </div>
          </div>
        </div>

        <div>
          <label className="text-slate-500 text-md mb-2">Location:</label>
          <p className="text-slate-900 text-md tracking-wide">
            {event?.location.street} <br />
            {event?.location.city}, {event?.location.state} <br />
            {event?.location.postalCode}
          </p>
        </div>

        <div className="my-4 text-slate-500 leading-relaxed max-w-2xl tracking-wide">
          <label className="text-slate-500 text-md mb-2 ">Description:</label>
          <p className="text-slate-900 text-md tracking-wide">
            {event?.description}
          </p>
        </div>
        {isBooked && isBooked.status === "booked" ? (
          <>
            <button
              type="button"
              onClick={openCancelBookingModal}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md cursor-pointer w-full mt-6"
            >
              Cancel Booking
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={openBookEventModal}
              className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-md cursor-pointer w-full mt-6"
            >
              Book Event
            </button>
          </>
        )}
      </div>
      {isBookEventModalOpen && (
        <BookEventModal
          event={event as Event}
          onClose={() => setIsBookEventModalOpen(false)}
          onSuccess={fetchBookingData}
        />
      )}
      {isCancelBookingModalOpen && (
        <CancelBookingModal
          booking={isBooked as Booking}
          onClose={() => setIsCancelBookingModalOpen(false)}
          onSuccess={fetchBookingData}
        />
      )}
    </div>
  );
}
