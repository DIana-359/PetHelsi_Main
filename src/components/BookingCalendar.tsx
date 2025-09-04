// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter, useParams } from "next/navigation";
// import dayjs, { Dayjs } from "dayjs";
// import "dayjs/locale/uk";
// import isoWeek from "dayjs/plugin/isoWeek";
// import Icon from "./Icon";
// import { Button } from "@heroui/react";

// dayjs.extend(isoWeek);
// dayjs.locale("uk");

// const WEEK_DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];

// type ApiSlot = {
//   startTime: string;
//   isAvailable: boolean;
//   price?: number;
//   cost?: number;
//   fee?: number;
//   amount?: number;
//   scheduleId?: number;
// };
// type SlotsResponse = { content: ApiSlot[] };
// type UiSlot = { time: string; available: boolean; price?: number };

// const pickHHmm = (t: string): string => {
//   const m = (t || "").match(/\b(\d{1,2}):(\d{2})/);
//   if (!m) return "00:00";
//   const h = m[1].padStart(2, "0");
//   const mm = m[2];
//   return `${h}:${mm}`;
// };

// const toMinutes = (hhmm: string) => {
//   const [h, m] = hhmm.split(":").map(Number);
//   return (h || 0) * 60 + (m || 0);
// };
// const fromMinutes = (min: number) => {
//   const h = Math.floor(min / 60)
//     .toString()
//     .padStart(2, "0");
//   const m = (min % 60).toString().padStart(2, "0");
//   return `${h}:${m}`;
// };
// const inferStep = (times: string[]) => {
//   const mins = [...new Set(times)].map(toMinutes).sort((a, b) => a - b);
//   const diffs = mins
//     .slice(1)
//     .map((v, i) => v - mins[i])
//     .filter((d) => d > 0);
//   const raw = diffs.length ? Math.min(...diffs) : 60;
//   const common = [15, 30, 45, 60];
//   return common.find((c) => raw % c === 0) ?? raw;
// };
// const buildGrid = (times: string[]) => {
//   if (times.length === 0) return [];
//   const sorted = [...new Set(times)].sort(
//     (a, b) => toMinutes(a) - toMinutes(b)
//   );
//   const step = inferStep(sorted);
//   const start = toMinutes(sorted[0]);
//   const end = toMinutes(sorted[sorted.length - 1]);
//   const grid: string[] = [];
//   for (let t = start; t <= end; t += step) grid.push(fromMinutes(t));
//   return grid;
// };

// function normalizeSlots(slots: UiSlot[], date: Dayjs): UiSlot[] {
//   const rawTimes = slots.map((s) => pickHHmm(s.time));
//   const grid = buildGrid(rawTimes);

//   const availableSet = new Set<string>();
//   for (const s of slots) {
//     const t = pickHHmm(s.time);
//     if (s.available) availableSet.add(t);
//   }

//   const now = dayjs();
//   return grid.map((t) => {
//     let available = availableSet.has(t);

//     if (date.isSame(now, "day")) {
//       const dt = dayjs(`${now.format("YYYY-MM-DD")} ${t}`, "YYYY-MM-DD HH:mm");
//       if (dt.isBefore(now)) available = false;
//     }
//     return { time: t, available };
//   });
// }

// async function getRealSlots(date: Dayjs, vetId?: string): Promise<UiSlot[]> {
//   const qs = new URLSearchParams({
//     page: "0",
//     size: "200",
//     sort: "startTime,asc",
//     date: date.format("YYYY-MM-DD"),
//   });
//   if (vetId) qs.set("vetId", String(vetId));

//   const res = await fetch(`/api/proxy/getAppointmentsSlots?${qs}`, {
//     cache: "no-store",
//   });
//   if (!res.ok) throw new Error(`HTTP ${res.status}`);
//   const data: SlotsResponse = await res.json();

//   return (data.content || []).map((s) => ({
//     time: pickHHmm(s.startTime),
//     available: !!s.isAvailable,
//   }));
// }

// export default function BookingCalendar() {
  // const router = useRouter();
  // const { id: vetId } = useParams() as { id?: string };

  // const MIN_DATE = dayjs().startOf("day");
  // const MAX_DATE = dayjs().add(27, "day").endOf("day");

  // const [currentWeekStart, setCurrentWeekStart] = useState<Dayjs>(
  //   dayjs().startOf("isoWeek")
  // );
  // const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  // const [timeSlots, setTimeSlots] = useState<UiSlot[]>([]);
  // const [selectedTime, setSelectedTime] = useState<string | null>(null);
  // const [loading, setLoading] = useState(false);
  // const [err, setErr] = useState<string | null>(null);
  // const [weekAvailability, setWeekAvailability] = useState<
  //   Record<string, boolean>
  // >({});
  // const days: Dayjs[] = Array.from({ length: 7 }, (_, i) =>
  //   currentWeekStart.add(i, "day")
  // );
  // const currentMonth = currentWeekStart.format("MMMM YYYY");

  // useEffect(() => {
  //   let cancelled = false;
  //   (async () => {
  //     for (let i = 0; i < 28; i++) {
  //       const d = MIN_DATE.add(i, "day");
  //       try {
  //         // const slots = await getRealSlots(d, vetId);
  //         const now = dayjs();
  //         const normalized = slots.map((s) => {
  //           const isPast =
  //             d.isSame(now, "day") &&
  //             dayjs(
  //               `${now.format("YYYY-MM-DD")} ${s.time}`,
  //               "YYYY-MM-DD HH:mm"
  //             ).isBefore(now);
  //           return { ...s, available: s.available && !isPast };
  //         });
  //         if (normalized.some((s) => s.available)) {
  //           if (!cancelled) {
  //             setSelectedDate(d);
  //             setCurrentWeekStart(d.startOf("isoWeek"));
  //           }
  //           break;
  //         }
  //       } catch {}
  //     }
  //   })();
  //   return () => {
  //     cancelled = true;
  //   };
  // }, [vetId]);

  // useEffect(() => {
  //   let cancelled = false;
  //   (async () => {
  //     const results = await Promise.all(
  //       days.map(async (d) => {
  //         if (d.isBefore(MIN_DATE, "day") || d.isAfter(MAX_DATE, "day"))
  //           return false;
  //         try {
  //           const slots = await getRealSlots(d, vetId);
  //           const now = dayjs();
  //           const has = slots.some((s) => {
  //             if (!s.available) return false;
  //             if (!d.isSame(now, "day")) return true;
  //             return dayjs(
  //               `${now.format("YYYY-MM-DD")} ${s.time}`,
  //               "YYYY-MM-DD HH:mm"
  //             ).isAfter(now);
  //           });
  //           return has;
  //         } catch {
  //           return false;
  //         }
  //       })
  //     );
  //     if (!cancelled) {
  //       const map: Record<string, boolean> = {};
  //       days.forEach((d, i) => (map[d.format("YYYY-MM-DD")] = results[i]));
  //       setWeekAvailability(map);
  //     }
  //   })();
  //   return () => {
  //     cancelled = true;
  //   };
  // }, [currentWeekStart, vetId]);

  // useEffect(() => {
  //   if (!selectedDate) return;
  //   let abort = false;
  //   (async () => {
  //     setLoading(true);
  //     setErr(null);
  //     setSelectedTime(null);
  //     try {
  //       const raw = await getRealSlots(selectedDate, vetId);
  //       const normalized = normalizeSlots(raw, selectedDate);
  //       if (!abort) setTimeSlots(normalized);
  //       // console.table(raw);
  //     } catch (e: unknown) {
  //       if (!abort) {
  //         if (e instanceof Error) {
  //           setErr(e.message);
  //         } else {
  //           setErr("Помилка завантаження слотів");
  //         }
  //       }
  //     } finally {
  //       if (!abort) setLoading(false);
  //     }
  //   })();
  //   return () => {
  //     abort = true;
  //   };
  // }, [selectedDate, vetId]);

  // const earliestWeek = MIN_DATE.startOf("isoWeek");
  // const latestWeek = MAX_DATE.startOf("isoWeek");
  // const canPrev = currentWeekStart.isAfter(earliestWeek, "day");
  // const canNext = currentWeekStart.isBefore(latestWeek, "day");
  // const go = (dir: -1 | 1) =>
  //   setCurrentWeekStart((d) =>
  //     (dir < 0 && !canPrev) || (dir > 0 && !canNext) ? d : d.add(7 * dir, "day")
  //   );

  // const handleBook = () => {
  //   if (!selectedDate || !selectedTime) {
  //     setErr("Час не обрано");
  //     return;
  //   }
  //   const q = new URLSearchParams({
  //     date: selectedDate.format("YYYY-MM-DD"),
  //     time: selectedTime,
  //   });
  //   router.push(`/veterinarians/${vetId}/booking?${q}`);
  // };

//   return (
//     <div className="w-[465px] h-full border border-gray-100 text-gray-900 rounded-[8px] px-10 py-8 mt-21">
//       <div className="flex justify-between items-center mb-6">
//         <button
//           onClick={() => go(-1)}
//           aria-label="Попередній тиждень"
//           disabled={!canPrev}
//           className={!canPrev ? "opacity-40 cursor-not-allowed" : ""}
//         >
//           <Icon
//             sprite="/sprites/sprite-sistem.svg"
//             id="arrow-left"
//             width="24px"
//             height="24px"
//             className="stroke-gray-200 hover:stroke-primary"
//           />
//         </button>
//         <h2 className="font-lato capitalize text-[16px]">{currentMonth}</h2>
//         <button
//           onClick={() => go(1)}
//           aria-label="Наступний тиждень"
//           disabled={!canNext}
//           className={!canNext ? "opacity-40 cursor-not-allowed" : ""}
//         >
//           <Icon
//             sprite="/sprites/sprite-sistem.svg"
//             id="arrow-rigth"
//             width="24px"
//             height="24px"
//             className="stroke-gray-200 hover:stroke-primary"
//           />
//         </button>
//       </div>

//       <div className="grid grid-cols-7 text-center text-4 text-gray-400 mb-2">
//         {WEEK_DAYS.map((d) => (
//           <div key={d} className="font-lato">
//             {d}
//           </div>
//         ))}
//       </div>

//       <div className="grid grid-cols-7 gap-y-2 text-center text-4 mb-6">
//         {days.map((d, i) => {
//           const ds = d.format("YYYY-MM-DD");
//           const outOfRange =
//             d.isBefore(MIN_DATE, "day") || d.isAfter(MAX_DATE, "day");
//           const noSlots = weekAvailability[ds] === false;
//           const isDisabled = outOfRange || noSlots;
//           const isSelected = !!selectedDate && d.isSame(selectedDate, "day");

//           return (
//             <div
//               key={i}
//               onClick={() => {
//                 if (!isDisabled) setSelectedDate(d);
//               }}
//               className={[
//                 "px-4 py-2 rounded-full select-none",
//                 isDisabled
//                   ? "text-gray-300 cursor-not-allowed border border-gray-200"
//                   : "cursor-pointer hover:bg-blue-100",
//                 isSelected && !isDisabled ? "bg-primary text-white" : "",
//               ].join(" ")}
//             >
//               {d.date()}
//             </div>
//           );
//         })}
//       </div>

//       <div className="text-center text-xs text-gray-400 bg-primary-100 p-1 rounded-[4px] mb-6">
//         Часовий пояс: Europe/Kyiv
//       </div>

//       {loading ? (
//         <div className="text-center text-[18px] text-gray-900 mb-6">
//           Завантаження…
//         </div>
//       ) : err ? (
//         <div className="text-center text-[14px] text-red-500 mb-6">{err}</div>
//       ) : !selectedDate ? (
//         <div className="text-center text-[14px] text-gray-500 mb-6">
//           Оберіть дату
//         </div>
//       ) : timeSlots.length === 0 ? (
//         <div className="text-center text-[14px] text-gray-500 mb-6">
//           Немає вільних слотів
//         </div>
//       ) : (
//         <div className="grid grid-cols-5 gap-2 text-sm text-center mb-8">
//           {timeSlots.map((s) => (
//             <button
//               key={`slot-${s.time}`}
//               disabled={!s.available}
//               onClick={() => s.available && setSelectedTime(s.time)}
//               className={[
//                 "px-4 py-2 rounded-[8px] border",
//                 !s.available
//                   ? "border-gray-200 text-gray-300 cursor-not-allowed"
//                   : selectedTime === s.time
//                   ? "border-primary text-primary"
//                   : "border-primary-300 hover:bg-gray-100",
//               ].join(" ")}
//             >
//               {s.time}
//             </button>
//           ))}
//         </div>
//       )}

//       <div className="flex justify-between items-center text-lg font-medium mb-4">
//         <p>Вартість</p>
//         <p>300 UAH</p>
//       </div>

//       <Button
//         onPress={handleBook}
//         className="w-full px-6 py-4 rounded-[8px] text-white text-[16px] h-11"
//         radius="sm"
//         color="primary"
//         type="button"
//       >
//         Записатися на обраний час
//       </Button>
//     </div>
//   );
// }
