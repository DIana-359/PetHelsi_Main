// "use client";

// import { useEffect, useState } from "react";
// import { useRouter, useParams } from "next/navigation";
// import { Pet } from "@/types/pet";
// import GoBackPets from "@/components/MyPets/GobackPets";
// import AddPetForm from "@/components/MyPets/AddPetForm";
// import UsePetAvatar from "@/components/MyPets/UsePetAvatar";
// // import DeletePetBtns from "@/components/MyPets/DeletePetBtn";
// import EditPetFormBtns from "@/components/MyPets/EditPetFormBtn";
// import { usePetValidation } from "@/hooks/PetFieldError/usePetValidation";

// export default function EditPetPage() {
//   const { id } = useParams<{ id: string }>();
//   const router = useRouter();

//   const [pet, setPet] = useState<Partial<Pet>>({});
//   const [initialPet, setInitialPet] = useState<Pet | null>(null);

//   const [image, setImage] = useState<{ preview: string; file: File } | null>(
//     null,
//   );
//   const [selected, setSelected] = useState<Date>();
//   const [isOpenCalendar, setIsOpenCalendar] = useState(false);
//   const [isBirthDateUnknown, setIsBirthDateUnknown] = useState(false);
//   const [birthMonth, setBirthMonth] = useState<string | undefined>();
//   const [birthYear, setBirthYear] = useState<string | undefined>();

//   const { getError, clearError } = usePetValidation({
//     newPet: pet,
//     isBirthDateUnknown,
//     birthYear,
//   });

//   useEffect(() => {
//     async function fetchPet() {
//       const res = await fetch(`/api/pets/${id}`);
//       if (!res.ok) return;
//       const data: Pet = await res.json();

//       setPet(data);
//       setInitialPet(data);
//       setSelected(data.birthDate ? new Date(data.birthDate) : undefined);
//     }

//     fetchPet();
//   }, [id]);

//   const handleCancel = () => {
//     if (!initialPet) return;
//     setPet(initialPet);
//     setImage(null);
//     setSelected(
//       initialPet?.birthDate ? new Date(initialPet.birthDate) : undefined,
//     );
//   };

//   if (!pet) return <div>Завантаження...</div>;

//   return (
//     <>
//       <div className="w-full min-h-screen flex justify-center bg-background overflow-auto scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent">
//         <div className="flex flex-col w-full rounded-[18px] outline-none">
//           <div className="flex justify-start px-4 sm:px-6 md:px-8 lg:px-10 pt-4 sm:pt-6 pb-2">
//             <GoBackPets />
//           </div>
//           <h1 className="lg:text-18px sm:text-2xl font-medium  px-4 sm:px-6 md:px-8 lg:px-12 pt-0 pb-6 sm:pb-10 text-gray-900">
//             <div className="aa">Редагування профілю тварини</div>
//           </h1>

//           <section className="pt-0 pb-6 sm:pb-10 px-6 sm:px-10 md:px-15 gap-4 ">
//             <div className="w-full flex flex-col items-center justify-center gap-6 md:flex-row md:items-start md:justify-start">
//               <div className="flex-shrink-0  flex justify-center md:justify-start">
//                 <fieldset className="flex flex-col gap-[24px] items-center md:items-start md:flex-row md:gap-[40px]">
//                   <div>
//                     <UsePetAvatar
//                       avatar={pet.avatar}
//                       firstName={pet.name}
//                       onChange={setImage}
//                       mode="edit"
//                     />
//                   </div>
//                 </fieldset>
//               </div>
//               <div className="w-full grid grid-cols-1  md:max-w-[304px]">
//                 <AddPetForm
//                   newPet={pet}
//                   setNewPet={setPet}
//                   selected={selected}
//                   setSelected={setSelected}
//                   isOpenCalendar={isOpenCalendar}
//                   setIsOpenCalendar={setIsOpenCalendar}
//                   isBirthDateUnknown={isBirthDateUnknown}
//                   setIsBirthDateUnknown={setIsBirthDateUnknown}
//                   birthMonth={birthMonth}
//                   setBirthMonth={setBirthMonth}
//                   birthYear={birthYear}
//                   setBirthYear={setBirthYear}
//                   getError={getError}
//                   clearError={clearError}
//                 />
//                 <EditPetFormBtns
//                   pet={pet}
//                   image={image}
//                   birthMonth={birthMonth}
//                   birthYear={birthYear}
//                   validate={() => {
//                     return (
//                       !getError("name") &&
//                       !getError("birthDate") &&
//                       !getError("birthYear")
//                     );
//                   }}
//                   onCancel={handleCancel}
//                   onDelete={() => router.push("/owner/pets")}
//                 />
//                 {/* <DeletePetBtns
//                   pet={pet}
//                   image={image}
//                   onCancel={handleCancel}
//                   onDelete={() => router.push("/my-pets")}
//                 /> */}
//               </div>
//             </div>
//           </section>
//         </div>
//       </div>
//     </>
//   );
// }
"use client";

export default function Page() {
  return <div>Сторінка редагування в процесі розробки</div>;
}
