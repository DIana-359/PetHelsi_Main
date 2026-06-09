"use client";

import { useEffect, useState } from "react";

interface UseUnsavedChangesProps {
  hasChanges: boolean;
}

export function useUnsavedChanges({ hasChanges }: UseUnsavedChangesProps) {
  const [isUnsavedOpen, setIsUnsavedOpen] = useState(false);

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

  return {
    isUnsavedOpen,
    setIsUnsavedOpen,
  };
}
