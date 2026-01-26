"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";

interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isVerified: boolean;
}

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/user/profile", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 401) {
            router.push("/login");
            return;
          }
          throw new Error("Failed to fetch profile");
        }
        return res.json();
      })
      .then((data) => {
        if (data.status === "success") {
          setProfile(data.data);
        }
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
        router.push("/login");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [router]);

  const handleLogout = async () => {
    await fetch("http://localhost:5000/api/user/logout", {
      method: "POST",
      credentials: "include",
    });
    window.dispatchEvent(new Event("auth-status-changed"));
    router.push("/");
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
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
            >
              Logout
            </button>
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
                <div className="p-4 bg-slate-50 rounded-lg text-slate-900">
                  {profile.firstName}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-500 mb-2">
                  Last Name
                </label>
                <div className="p-4 bg-slate-50 rounded-lg text-slate-900">
                  {profile.lastName}
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-500 mb-2">
                  Email
                </label>
                <div className="p-4 bg-slate-50 rounded-lg text-slate-900">
                  {profile.email}
                </div>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
