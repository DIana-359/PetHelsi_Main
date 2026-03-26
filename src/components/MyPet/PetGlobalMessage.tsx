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
  const paramsString = searchParams.toString();

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

    let message: GlobalMessageType | null = null;

    if (key) {
      message = messagesMap[key];
    } else if (searchParams.get("deleted") === "1" && name) {
      message = {
        message: `Профіль ${name} успішно видалено`,
        variant: "success",
      };
    }
    if (message) {
      setGlobalMessage(message);
      router.replace("/owner/pets");
    }
  }, [paramsString, router]);

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
