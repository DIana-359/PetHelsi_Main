"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

interface UseUnsavedChangesProps {
  hasChanges: boolean;
}

export function useUnsavedChanges({ hasChanges }: UseUnsavedChangesProps) {
  const router = useRouter();
  const [isUnsavedOpen, setIsUnsavedOpen] = useState(false);
  const [nextRoute, setNextRoute] = useState<string | null>(null);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!hasChanges) return;

      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasChanges]);

  const attemptNavigation = useCallback(
    (url: string) => {
      if (!hasChanges) {
        router.push(url);
      } else {
        setNextRoute(url);
        setIsUnsavedOpen(true);
      }
    },
    [hasChanges, router],
  );

  const discardChangesAndNavigate = useCallback(() => {
    setIsUnsavedOpen(false);
    if (nextRoute) {
      const route = nextRoute;
      setNextRoute(null);
      router.push(route);
    }
  }, [nextRoute, router]);

  return {
    isUnsavedOpen,
    setIsUnsavedOpen,
    attemptNavigation,
    discardChangesAndNavigate,
  };
}
