"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isVerified: boolean;
}

export default function Page() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editProfile, setEditProfile] = useState(false);
  const [deleteProfile, setDeleteProfile] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

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
          console.log("data", data);
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

  const handleLogout = async () => {
    await fetch("http://localhost:5000/api/users/logout", {
      method: "POST",
      credentials: "include",
    });
    window.dispatchEvent(new Event("auth-status-changed"));
    router.push("/");
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

  if (!profile) {
    return null;
  }

  console.log("profile", profile);

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
      </div>
    </div>
  );
}
