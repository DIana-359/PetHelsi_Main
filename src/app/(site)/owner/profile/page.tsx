"use client";
import ProfileOwner from "@/components/ProfileOwner/ProfileOwner";
import { Pulse } from "@/components/Pulse";
import { useEffect } from "react";
import { useAuth } from "@/contextAuth/authContext";

export default function OwnerProfile() {
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

  return (
    <div>
      <ProfileOwner userData={userData} />
    </div>
  );
}
