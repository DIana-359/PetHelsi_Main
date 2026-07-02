"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Pulse } from "@/components/Pulse";
import { apiFetch } from "@/lib/apiFetch.client";
import { RoleType } from "@/types/roleTypes";
import { resolveHomePath } from "@/services/auth/resolveHomePath.client";

export default function OAuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const rawState = params.get("state");

    let role: RoleType | undefined;

    if (rawState) {
      try {
        role = JSON.parse(decodeURIComponent(rawState)).role ?? "CLIENT";
      } catch {}
    }

    if (!code) return;

    apiFetch("/api/proxy/exchange", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, role }),
    })
      .then(async res => {
        if (!res.ok) throw new Error("Exchange failed");
        router.replace(await resolveHomePath());
      })
      .catch(() => router.replace("/signup"));
  }, [router]);

  return (
    <div className="h-screen flex items-center justify-center">
      <Pulse />
    </div>
  );
}
