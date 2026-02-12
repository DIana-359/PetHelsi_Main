"use client";
import { Button } from "@heroui/react";
import Link from "next/link";
import { useState } from "react";
import SignUpModal from "../ModalSignUp";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useProfile } from "@/hooks/owners/useProfile";
interface IVeterinariansButtonsProps {
  id: number;
  size?: "small" | "large" | "base";
}

export default function VeterinariansButtons({
  id,
  size = "base",
}: IVeterinariansButtonsProps) {
  const pathname = usePathname();
  const router = useRouter();
  const params = useSearchParams();
  const { data } = useProfile();
  const issueTypeFromForm = params.get("issueTypeName");
  const isHomePage = pathname == "/";
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const buttonMoreStyles = {
    small: "h-9 text-sm font-normal leading-[140%]",
    large: "h-11 text-base font-normal leading-[140%]",
    base: "h-12 text-base font-normal leading-[100%]",
  };

  const buttonTodayStyles = {
    small: "h-9 text-xs font-medium leading-[140%]",
    large: "h-11 text-sm font-normal leading-[140%]",
    base: "h-12 text-sm font-normal leading-[100%]",
  };

  const handleClick = () => {
    if (!data) {
      setIsSignUpOpen(true);
      return;
    }

    const url = new URL(`/veterinarians/${id}/booking`, window.location.origin);

    if (issueTypeFromForm) {
      url.searchParams.set("issueTypeName", issueTypeFromForm);
    }

    router.push(url.pathname + url.search);
  };

  return (
    <>
      <Button
        className={`flex border rounded-lg py-2 border-primary-700 bg-primary-100 w-full mb-2 h-[55px] ${
          buttonMoreStyles[size]
        } ${isHomePage ? "mt-[20px]" : "mt-0"}
        `}
        variant="bordered"
        style={{ height: "55px" }}
        onPress={handleClick}>
        <div className="flex flex-col">
          <span className="font-[400] text-[14px] leading-[100%] tracking-[0] text-center text-gray-600 mb-1">
            Швидке бронювання
          </span>
          <span className="font-normal text-[16px] leading-[100%] tracking-[0] align-middle text-gray-900">
            23 Тра о 18:00
          </span>
        </div>
      </Button>
      <Button
        className={`border rounded-lg border-gray-100 bg-background text-gray-800 w-full ${buttonTodayStyles[size]}`}
        variant="bordered">
        <Link href={`/veterinarians/${id}`}>Вибрати іншу дату та час</Link>
      </Button>
      <SignUpModal
        isOpen={isSignUpOpen}
        onClose={() => setIsSignUpOpen(false)}
        hideRoleTabs={true}
      />
    </>
  );
}
