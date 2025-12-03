import { useState, useEffect } from "react";
import { useSistem } from "@/contextSistem/contextSistem";

export default function useMedia() {
  const [isMobileViewport, setIsMobileViewport] = useState<boolean | null>(null);
  const { setIsOpenModalDashboard } = useSistem();

  useEffect(() => {
    const checkViewport = () => {
      const isMobile = window.innerWidth < 768;
      setIsMobileViewport(isMobile);

      if (!isMobile) {
        setIsOpenModalDashboard(false);
      }
    };

    checkViewport();

    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, [setIsOpenModalDashboard]);

  return isMobileViewport;
}
