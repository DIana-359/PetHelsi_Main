import { Pulse } from "@/components/Pulse";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-white/50 z-[9999] flex items-center justify-center">
      <Pulse />
    </div>
  );
}