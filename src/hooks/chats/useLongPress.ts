import { useCallback, useEffect, useRef } from "react";

const DEFAULT_DELAY_MS = 400;
const MOVEMENT_THRESHOLD_PX = 10;
const CLICK_SUPPRESSION_WINDOW_MS = 400;

export function useLongPress(callback: () => void, delayMs: number = DEFAULT_DELAY_MS) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startPosRef = useRef<{ x: number; y: number } | null>(null);
  const suppressUntilRef = useRef(0);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      startPosRef.current = { x: touch.clientX, y: touch.clientY };
      clearTimer();
      timerRef.current = setTimeout(() => {
        timerRef.current = null;
        suppressUntilRef.current = Date.now() + CLICK_SUPPRESSION_WINDOW_MS;
        callback();
      }, delayMs);
    },
    [callback, delayMs]
  );

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    const start = startPosRef.current;
    if (!touch || !start) return;
    const dx = Math.abs(touch.clientX - start.x);
    const dy = Math.abs(touch.clientY - start.y);
    if (dx > MOVEMENT_THRESHOLD_PX || dy > MOVEMENT_THRESHOLD_PX) {
      clearTimer();
    }
  }, []);

  const onTouchEnd = useCallback(() => {
    clearTimer();
    startPosRef.current = null;
  }, []);

  const onTouchCancel = useCallback(() => {
    clearTimer();
    startPosRef.current = null;
  }, []);

  const onClickCapture = useCallback((e: React.MouseEvent) => {
    if (Date.now() < suppressUntilRef.current) {
      e.preventDefault();
      e.stopPropagation();
      suppressUntilRef.current = 0;
    }
  }, []);

  return { onTouchStart, onTouchMove, onTouchEnd, onTouchCancel, onClickCapture };
}
