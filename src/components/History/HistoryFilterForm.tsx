// "use client";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useState } from "react";
// // import { IHistoryItem } from "@/utils/types/historyItem";
// import { optionsAnimals } from "@/components/Hero/Constants";
// import Icon from "../Icon";

// interface HistoryFilterFormProps {
//   search?: string;
//   pet?: string;
//   period?: string;
// }

// const periodOptions = [
//   { value: "all", label: "За весь час" },
//   { value: 3, label: "За останні 3 місяці" },
//   { value: 6, label: "За останні 6 місяців" },
//   { value: 365, label: "За останній рік" },
// ];

// export default function HistoryFilterForm({
//   search,
//   // pet,
//   // period,
// }: HistoryFilterFormProps) {
//   //     const getHistory = await fetch("");
//   //    const data: IHistoryItem[] = await getHistory.json();
//   const [isPetOpen, setIsPetOpen] = useState<boolean>(false);
//   const [isPeriodOpen, setIsPeriodOpen] = useState<boolean>(false);
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const handleSearch = (field: string, value: string) => {
//     const params = new URLSearchParams(searchParams.toString());
//     console.log(field, value);

//     if (value) {
//       params.set(field, value);
//     } else {
//       params.delete(field);
//     }

//     router.push(`?${params.toString()}`);
//   };

//   return (
//     <div className="flex flex-col items-center lg:flex-row gap-[16px] mb-[16px]">
//       <div className="relative">
//         <input
//           type="text"
//           name="name"
//           placeholder="Пошук"
//           defaultValue={search ?? ""}
//           onChange={e => handleSearch("name", e.target.value)}
//           className="w-[280px] py-[10px] pl-[46px] pr-[12px] placeholder:pl-[0] placeholder:text-gray-350 placeholder:text-[14px] text-[16px] text-gray-900 bg-background border-[1px] border-primary-300 rounded-[8px] focus:outline-none focus:border-primary-700"
//         />
//         <Icon
//           sprite="/sprites/sprite-sistem.svg"
//           id="icon-name-search"
//           width="24px"
//           height="24px"
//           className="absolute left-[12px] top-[10px] stroke-gray-350 pointer-events-none"
//         />
//       </div>

//       <div className="relative w-[200px]">
//         <Icon
//           sprite="/sprites/sprite-sistem.svg"
//           id={isPetOpen ? "icon-arrow_up" : "icon-arrow_down"}
//           width="24px"
//           height="24px"
//           className="absolute top-[10px] right-[12px] stroke-gray-900 fill-background pointer-events-none"
//         />

//         <select
//           id="pet"
//           name="pet"
//           defaultValue={searchParams.get("pet") ?? ""}
//           onMouseDown={() => setIsPetOpen(true)}
//           onChange={e => {
//             handleSearch("pet", e.target.value);
//             setIsPetOpen(false);
//           }}
//           onBlur={() => setIsPetOpen(false)}
//           className="w-full py-[10px] px-[12px] border border-primary-300 rounded-[8px] text-[16px] text-gray-900 bg-background focus:outline-none focus:border-primary-700 appearance-none">
//           {optionsAnimals.map((pet, i) => (
//             <option key={i} value={pet.value}>
//               {pet.key}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="relative w-[200px]">
//         <Icon
//           sprite="/sprites/sprite-sistem.svg"
//           id={isPeriodOpen ? "icon-arrow_up" : "icon-arrow_down"}
//           width="24px"
//           height="24px"
//           className="absolute top-[10px] right-[12px] stroke-gray-900 fill-background pointer-events-none"
//         />

//         <select
//           id="period"
//           name="period"
//           defaultValue={searchParams.get("period") ?? ""}
//           onMouseDown={() => setIsPeriodOpen(true)}
//           onChange={e => {
//             handleSearch("period", e.target.value);
//             setIsPeriodOpen(false);
//           }}
//           onBlur={() => setIsPeriodOpen(false)}
//           className="w-full py-[10px] px-[12px] border border-primary-300 rounded-[8px] text-[16px] text-gray-900 bg-background focus:outline-none focus:border-primary-700 appearance-none">
//           {periodOptions.map((period, i) => (
//             <option
//               key={i}
//               value={period.value}
//               className="w-full py-[10px] px-[12px] bg-background border-none">
//               {period.label}
//             </option>
//           ))}
//         </select>
//       </div>
//     </div>
//   );
// }
