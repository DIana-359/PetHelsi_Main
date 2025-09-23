"use client";

import { fetchSignoutCookieProxy } from "@/app/api/auth-proxy";
import { deleteAccount } from "@/app/services/deleteAccount";
import Icon from "@/components/Icon";
import { useRouter } from "next/navigation";

export function DeleteAccountButton() {
  const router = useRouter();
  const handleDelete = async () => {
    if (!confirm("Ви впевнені, що хочете видалити акаунт?")) return;

    try {
      await deleteAccount();
      await fetchSignoutCookieProxy();
      router.push("/signin");
    } catch (err) {
      console.error("Delete error:", err);
      alert("Не вдалося видалити акаунт");
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="flex items-center gap-[8px] py-[9px] px-[12px] group cursor-pointer"
    >
      <Icon
        sprite="/sprites/sprite-sistem.svg"
        id="icon-delete"
        width="20px"
        height="20px"
        className="stroke-error-500 fill-none md:w-[24px] md:h-[24px] group-hover:stroke-error-600 transition-stroke duration-300"
      />
      <span className="text-[14px] md:text-[16px] font-[400] leading-[1.4] text-error-500 group-hover:text-error-600 transition-colors duration-300">
        Видалити акаунт
      </span>
    </button>
  );
}