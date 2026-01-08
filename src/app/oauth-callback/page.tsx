"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Pulse } from "@/components/Pulse";

export default function OAuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const rawState = params.get("state");

    let role: "CLIENT" | "DOCTOR" | undefined;

    if (rawState) {
      try {
        role = JSON.parse(decodeURIComponent(rawState)).role ?? "CLIENT";
      } catch {}
    }

    if (!code) return;

    fetch("api/proxy/exchange", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, role }),
    })
      .then(async res => {
        if (!res.ok) throw new Error("Exchange failed");
        //const data = await res.json();
        //if (data.token) localStorage.setItem("token", data.token);
        // TODO check if role CLIENT - redirect page profile else - redirect page - vet page etc
        router.replace("/owner/profile");
      })
      .catch(() => router.replace("/signup"));
  }, [router]);

  return (
    <div className="h-screen flex items-center justify-center">
      <Pulse />
    </div>
  );
}
