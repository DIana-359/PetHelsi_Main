"use client";
import Icon from "@/components/Icon";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUIStore } from "@/stores/useUIStore";
import useMedia from "@/hooks/media";
import AvatarUser from "@/components/ProfileOwner/AvatarUser";
import { useProfile } from "@/hooks/owners/useProfile";
import { useDoctorProfile } from "@/hooks/doctors/useDoctorProfile";

export default function HeaderOwnerActions() {
  const isMobile = useMedia();
  const router = useRouter();
  const { data: owner } = useProfile();
  const { data: doctor } = useDoctorProfile();

  const isVet = !owner && !!doctor;
  const homePath = isVet ? "/vet/profile" : "/owner/profile";
  const avatar = isVet ? doctor?.avatar : owner?.avatar;
  const displayName = isVet ? doctor?.name : owner?.firstName;
  const email = isVet ? doctor?.userEmail : owner?.email;

  const [showNotification, setShowNotification] = useState(false);
  const isOpenModalDashboard = useUIStore(s => s.isOpenModalDashboard);
  const setIsOpenModalDashboard = useUIStore(s => s.setIsOpenModalDashboard);

  const handleOpenDashboard = () => {
    if (!isMobile || isVet) {
      router.push(homePath);
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
            avatar={avatar}
            firstName={displayName}
            email={email}
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
