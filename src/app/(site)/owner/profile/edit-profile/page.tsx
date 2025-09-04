"use client";
import ProfileEditForm from "@/components/ProfileEditForm/ProfileEditForm";
import { Pulse } from "@/components/Pulse";
import { useAuth } from "@/contextAuth/authContext";
import { useEffect } from "react";

export default function OwnerEditPage() {
  const { userData, setUserData } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/proxy/profile", {
          credentials: "include",
        });

        const json = await res.json();
        setUserData(json);
      } catch (err) {
        console.error("Error getting profile", err);
      }
    };

    fetchProfile();
  }, [setUserData]);

  if (!userData) return <Pulse />;

  return <ProfileEditForm data={userData} />;
}
