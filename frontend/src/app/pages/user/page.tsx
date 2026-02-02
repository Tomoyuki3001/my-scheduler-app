"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isVerified: boolean;
}

interface BookedItem {
  _id: string;
  eventId: string;
  userId: string;
  status: string;
  bookedDate: string;
  createdAt: string;
  event: {
    _id: string;
    title: string;
    description: string;
    start: string;
    end: string;
    location?: {
      street: string;
      city: string;
      state: string;
      postalCode: string;
    };
  };
}

interface MyEventItem {
  _id: string;
  title: string;
  description: string;
  start: string;
  end: string;
  location?: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
  };
}

export default function Page() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editProfile, setEditProfile] = useState(false);
  const [deleteProfile, setDeleteProfile] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [bookedList, setBookedList] = useState<BookedItem[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [myEventsList, setMyEventsList] = useState<MyEventItem[]>([]);
  const [loadingMyEvents, setLoadingMyEvents] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      await fetch("http://localhost:5000/api/users/me", {
        credentials: "include",
      })
        .then(async (res) => {
          if (!res.ok) {
            if (res.status === 401) {
              router.push("/pages/auth/login");
              return;
            }
            throw new Error("Failed to fetch profile");
          }
          const data = await res.json();
          setProfile(data.data);
        })
        .catch((err) => {
          console.error("Error fetching profile:", err);
          router.push("/pages/auth/login");
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchProfile();
  }, [router]);

  useEffect(() => {
    if (!profile?.id) return;
    const fetchBookings = async () => {
      setLoadingBookings(true);
      try {
        const res = await fetch(
          `http://localhost:5000/api/bookings/user/${profile.id}`,
          { credentials: "include" }
        );
        if (res.ok) {
          const data = await res.json();
          setBookedList(data.data ?? []);
        }
      } catch (err) {
        console.error("Error fetching bookings:", err);
      } finally {
        setLoadingBookings(false);
      }
    };
    fetchBookings();
  }, [profile?.id]);

  useEffect(() => {
    if (!profile?.id) return;
    const fetchMyEvents = async () => {
      setLoadingMyEvents(true);
      try {
        const res = await fetch(
          `http://localhost:5000/api/events/created/${profile.id}`,
          { credentials: "include" }
        );
        if (res.ok) {
          const data = await res.json();
          setMyEventsList(data.data ?? []);
        }
      } catch (err) {
        console.error("Error fetching my events:", err);
      } finally {
        setLoadingMyEvents(false);
      }
    };
    fetchMyEvents();
  }, [profile?.id]);

  const handleLogout = async () => {
    await fetch("http://localhost:5000/api/users/logout", {
      method: "POST",
      credentials: "include",
    });
    window.dispatchEvent(new Event("auth-status-changed"));
    router.push("/");
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/events/${eventId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete event");
      setMyEventsList((prev) => prev.filter((e) => e._id !== eventId));
    } catch (err) {
      console.error("Error deleting event:", err);
      alert("Failed to delete event. Please try again.");
    }
  };

  const handleEditProfile = async () => {
    try {
      await fetch(`http://localhost:5000/api/users/${profile?.id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: profile?.firstName,
          lastName: profile?.lastName,
          email: profile?.email,
        }),
      });
      window.dispatchEvent(new Event("auth-status-changed"));
      setEditProfile(false);
      router.push("/pages/user");
    } catch (error) {
      console.error("Error editing profile:", error);
    }
  };

  const handleDeleteProfile = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/users/${profile?.id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (!res.ok) {
        throw new Error("Failed to delete profile");
      }
      window.dispatchEvent(new Event("auth-status-changed"));
    } catch (error) {
      console.error("Error deleting profile:", error);
    } finally {
      setDeleteProfile(true);
      setDeleteModal(false);
      setEditProfile(false);
      router.push("/");
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (time: string) => {
    return new Date(time).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!profile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Profile</h1>
            {editProfile ? (
              <div>
                <button
                  onClick={() => setEditProfile(false)}
                  className="px-6 py-2 mr-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditProfile}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  Save
                </button>
              </div>
            ) : (
              <div>
                <button
                  onClick={() => setEditProfile(true)}
                  className="px-6 py-2 mr-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  Edit Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-center mb-8">
              <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {profile.firstName.charAt(0).toUpperCase()}
                {profile.lastName.charAt(0).toUpperCase()}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-500 mb-2">
                  First Name
                </label>
                {editProfile ? (
                  <input
                    type="text"
                    value={profile?.firstName}
                    onChange={(e) =>
                      setProfile({ ...profile, firstName: e.target.value })
                    }
                    className="w-full p-2 border border-slate-300 rounded-lg text-slate-900"
                  />
                ) : (
                  <div className="p-4 bg-slate-50 rounded-lg text-slate-900">
                    {profile.firstName}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-500 mb-2">
                  Last Name
                </label>
                {editProfile ? (
                  <input
                    type="text"
                    value={profile?.lastName}
                    onChange={(e) =>
                      setProfile({ ...profile, lastName: e.target.value })
                    }
                    className="w-full p-2 border border-slate-300 rounded-lg text-slate-900"
                  />
                ) : (
                  <div className="p-4 bg-slate-50 rounded-lg text-slate-900">
                    {profile.lastName}
                  </div>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-500 mb-2">
                  Email
                </label>
                {editProfile ? (
                  <input
                    type="email"
                    value={profile?.email}
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                    className="w-full p-2 border border-slate-300 rounded-lg text-slate-900"
                  />
                ) : (
                  <div className="p-4 bg-slate-50 rounded-lg text-slate-900">
                    {profile.email}
                  </div>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-500 mb-2">
                  Verification Status
                </label>
                <div className="p-4 bg-slate-50 rounded-lg">
                  {profile.isVerified ? (
                    <span className="inline-flex items-center gap-2 text-green-600 font-medium">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                      Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 text-amber-600 font-medium">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                        />
                      </svg>
                      Not Verified
                    </span>
                  )}
                </div>
                {deleteProfile ? (
                  <div className="flex items-center justify-end mt-4">
                    <button
                      onClick={() => setDeleteModal(false)}
                      className="px-6 py-2 mr-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-end mt-4">
                    <button
                      onClick={() => setDeleteModal(true)}
                      className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                    >
                      Delete Profile
                    </button>
                  </div>
                )}
                {deleteModal && (
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-8">
                      <h2 className="text-2xl font-bold text-slate-900 mb-4">
                        Delete Your Account
                      </h2>
                      <p className="text-slate-500 mb-4">
                        Are you sure you want to delete your profile?
                      </p>
                      <div className="flex items-center justify-end">
                        <button
                          onClick={() => setDeleteModal(false)}
                          className="px-6 py-2 mr-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleDeleteProfile}
                          className="px-6 py-2 bg-red-700 hover:bg-red-800 text-white rounded-lg font-medium transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            My Bookings
          </h2>

          {loadingBookings ? (
            <div className="py-12 text-center text-slate-500">
              Loading bookings...
            </div>
          ) : bookedList.length === 0 ? (
            <div className="py-12 text-center text-slate-500 rounded-xl bg-slate-50">
              No upcoming booked events.
            </div>
          ) : (
            <ul className="space-y-3">
              {bookedList.map((item) => (
                <li key={item._id}>
                  <Link
                    href={`/pages/events/${item.event._id}`}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-colors"
                  >
                    <div className="min-w-0">
                      <span className="font-semibold text-slate-900 truncate block">
                        {item.event?.title ?? "Event"}
                      </span>
                      <p className="text-sm text-slate-500 mt-1">
                        <span className="mr-2">
                          {formatDate(item.event?.start)}
                        </span>{" "}
                        {item.event?.start
                          ? `${formatTime(item.event.start)}`
                          : ""}
                        {item.event?.end
                          ? ` ~ ${formatTime(item.event.end)}`
                          : ""}
                      </p>
                    </div>
                    <span className="shrink-0 text-sm font-medium text-blue-600">
                      View event →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">My Events</h2>

          {loadingMyEvents ? (
            <div className="py-12 text-center text-slate-500">
              Loading events...
            </div>
          ) : myEventsList.length === 0 ? (
            <div className="py-12 text-center text-slate-500 rounded-xl bg-slate-50">
              No upcoming events you created.
            </div>
          ) : (
            <ul className="space-y-3">
              {myEventsList.map((item) => (
                <li
                  key={item._id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors"
                >
                  <Link href={`/pages/events/${item._id}`} className="min-w-0">
                    <span className="font-semibold text-slate-900 truncate block hover:text-blue-600">
                      {item.title}
                    </span>
                    <p className="text-sm text-slate-500 mt-1">
                      <span className="mr-2">{formatDate(item.start)}</span>
                      {item.start ? `${formatTime(item.start)}` : ""}
                      {item.end ? ` ~ ${formatTime(item.end)}` : ""}
                    </p>
                  </Link>
                  <div className="shrink-0 flex gap-2">
                    <Link
                      href={`/pages/events/${item._id}`}
                      className="px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDeleteEvent(item._id)}
                      className="px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
