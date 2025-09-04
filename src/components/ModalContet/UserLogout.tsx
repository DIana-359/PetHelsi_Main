import { HiOutlineUserCircle } from "react-icons/hi";
import Cookies from "js-cookie";
// import { fetchLogout } from "../../contextAuth/operations";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { useAuth } from "../../contextAuth/authContext";
import { useSistem } from "@/contextSistem/contextSistem";
import { fetchSignoutCookieProxy } from "@/app/api/auth-proxy";

export default function UserLogout() {
  const router = useRouter();
  const { setIsLoggedIn } = useAuth();
  const { setIsModalOpen, setModalContent } = useSistem();

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  async function exit() {
    try {
      await fetchSignoutCookieProxy();
      Cookies.remove("auth-token");
      setIsLoggedIn(false);
      closeModal();
      router.push("/signin");
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  return (
    <div className="flex flex-col items-center md:w-[304px]">
      <p className="text-[22px] md:text-[24px] font-[500] leading-[1] text-gray-900 mb-3">
        Вийти з акаунту?
      </p>
      <HiOutlineUserCircle
        width="64px"
        height="64px"
        style={{ strokeWidth: 0.5 }}
        className="stroke-gray-900 w-[64px] h-[64px] md:w-[128px] md:h-[128px] mb-3"
      />

      <Button
        type="button"
        className="flex items-center text-background bg-primary-700 cursor-pointer mb-[8px] w-full"
        onPress={() => {
          closeModal();
        }}>
        Скасувати
      </Button>

      <Button
        variant="ghost"
        className="flex items-center text-primary-700 bg-background hover:bg-primary-300 border-[1px] border-primary-700 cursor-pointer w-full"
        onPress={() => {
          exit();
        }}>
        Так, вийти
      </Button>
    </div>
  );
}
