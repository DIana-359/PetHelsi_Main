"use client";

import { useEffect, useState } from "react";

function getCookie(name: string) {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() ?? null;
  }
  return null;
}

export function useCurrentUserId() {
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  useEffect(() => {
    const id = getCookie("user-id");
    if (id) setCurrentUserId(Number(id));
  }, []);

  return currentUserId;
}
