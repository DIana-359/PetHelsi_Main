"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { GlobalMessage } from "@/components/MyPet/GlobalMessage";

type GlobalMessageType = {
  message: string;
  variant?: "success" | "warning";
};

export default function PetGlobalMessage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [globalMessage, setGlobalMessage] = useState<GlobalMessageType | null>(
    null,
  );

  useEffect(() => {
    const name = searchParams.get("name");

    const messagesMap: Record<string, GlobalMessageType> = {
      created: {
        message: "Профіль тварини успішно створено",
        variant: "success",
      },
      updated: { message: "Ваші дані успішно збережені", variant: "success" },
      unsave: { message: "Ваші зміни не було збережено", variant: "warning" },
    };

    const key = Object.keys(messagesMap).find(
      (k) => searchParams.get(k) === "1",
    );

    if (key) {
      setGlobalMessage(messagesMap[key]);
      router.replace("/owner/pets");
    } else if (searchParams.get("deleted") === "1" && name) {
      setGlobalMessage({
        message: `Профіль ${name} успішно видалено`,
        variant: "success",
      });
      router.replace("/owner/pets");
    }
  }, [searchParams, router]);

  if (!globalMessage) return null;

  return (
    <GlobalMessage
      visible
      onClose={() => setGlobalMessage(null)}
      message={globalMessage.message}
      variant={globalMessage.variant}
    />
  );
}
