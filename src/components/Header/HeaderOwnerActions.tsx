"use client";
import Icon from "../Icon";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSistem } from "@/contextSistem/contextSistem";
import useMedia from "@/utils/media";
import AvatarUser from "@/components/ProfileOwner/AvatarUser";
import { useAuth } from "@/contextAuth/authContext";
interface Props {
  decoded: {
    exp?: number;
    iat?: number;
    sub?: string;
    avatar?: string;
  };
}

export default function HeaderOwnerActions({ decoded }: Props) {
  const isMobile = useMedia();
  const router = useRouter();
  const { userData } = useAuth();

  const [showNotification, setShowNotification] = useState(false);
  const { isOpenModalDashboard, setIsOpenModalDashboard } = useSistem();

  const handleOpenDashboard = () => {
    if (!isMobile) {
      router.push("/owner/profile");
    } else {
      setIsOpenModalDashboard(true);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => setShowNotification(!showNotification)}
        className="flex items-center justify-center cursor-pointer">
        <Icon
          sprite="/sprites/sprite-sistem.svg"
          id="icon-bell"
          width="24px"
          height="24px"
          className="stroke-gray fill-background hover:stroke-primary"
        />
      </button>

      {!isOpenModalDashboard ? (
        <button
          onClick={handleOpenDashboard}
          className="flex items-center justify-center hover:stroke-primary">
          <AvatarUser
            avatar={decoded.avatar}
            firstLetter={userData?.firstName}
            size={32}
          />
        </button>
      ) : (
        <button
          onClick={() => setIsOpenModalDashboard(false)}
          className="flex items-center justify-center cursor-pointer">
          <Icon
            sprite="/sprites/sprite-sistem.svg"
            id="icon-close"
            width="24px"
            height="24px"
            className="stroke-gray fill-background hover:stroke-primary"
          />
        </button>
      )}
    </div>
  );
}
