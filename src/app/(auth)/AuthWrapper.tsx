"use client";
import Icon from "@/components/Icon";
import { useSistem } from "@/contextSistem/contextSistem";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isVetBackground, setIsVetBackground } = useSistem();
  const goBack = () => {
    router.push("/");
  };

  useEffect(() => {
    return () => {
      setIsVetBackground(false);
    };
  }, [setIsVetBackground]);

  return (
    <section
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
      className={`relative !z-0 m-0 p-[16px] xs:pt-[41px] xs:pb-[39px] xs:pr-[48px] xl:pr-[110px] flex items-center justify-center 
       md:justify-end w-full mx-auto bg-cover bg-center bg-no-repeat h-screen min-h-full overflow-y-auto 

        ${
          isVetBackground
            ? "bg-[linear-gradient(rgba(33,78,86,0.1),rgba(83,171,237,0.1)),url('/Images/doctor-background@2x.png')]"
            : "bg-[linear-gradient(rgba(136,37,48,0.1),rgba(250,152,152,0.1)),url('/Images/owner-background@2x.png')]"
        }`}>
      <button
        onClick={goBack}
        className="absolute lg:top-[32px] lg:left-[32px] xl:left-[72px] [filter:drop-shadow(0_2px_4px_rgba(0,0,0,0.1))] cursor-pointer">
        <Icon
          sprite="/sprites/sprite-sistem.svg"
          id="icon-pet-helsi-logo"
          width="150px"
          height="26px"
          className={` transition-stroke duration-300 ease-in-out 
             ${
               !isVetBackground
                 ? "fill-background hover:stroke-background"
                 : "fill-primary-700 hover:stroke-primary-700 "
             } 
         `}
        />
      </button>
      {children}
    </section>
  );
}
