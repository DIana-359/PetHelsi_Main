"use client";
import { useState, useEffect } from "react";

export default function useMedia(viewport: number) {
  const [matches, setMatches] = useState<boolean>(
    typeof window !== "undefined" ? window.innerWidth < viewport : false
  );

  useEffect(() => {
    const checkViewport = () => setMatches(window.innerWidth < viewport);

    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, [viewport]);

  return matches;
}
