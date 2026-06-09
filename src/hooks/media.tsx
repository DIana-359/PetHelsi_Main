import { useState, useEffect } from "react";
import { useUIStore } from "@/stores/useUIStore";

export default function useMedia() {
  const [isMobileViewport, setIsMobileViewport] = useState<boolean | null>(null);
  const setIsOpenModalDashboard = useUIStore(s => s.setIsOpenModalDashboard);

  useEffect(() => {
    const checkViewport = () => {
      const isMobile = window.innerWidth < 1024;
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
