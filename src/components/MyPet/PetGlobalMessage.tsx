"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { GlobalMessage } from "@/components/MyPet/GlobalMessage";

export default function PetGlobalMessage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [globalMessage, setGlobalMessage] = useState<{
    message: string;
    variant?: "success" | "warning";
  } | null>(null);

  const hideMessage = () => setGlobalMessage(null);

  useEffect(() => {
    const created = searchParams.get("created");
    const updated = searchParams.get("updated");
    const unsave = searchParams.get("unsave");
    const deleted = searchParams.get("deleted");
    const name = searchParams.get("name");

    if (created === "1") {
      setGlobalMessage({
        message: "Профіль тварини успішно створено",
        variant: "success",
      });
      router.replace("/owner/pets");
    } else if (updated === "1") {
      setGlobalMessage({
        message: "Ваші дані успішно збережені",
        variant: "success",
      });
      router.replace("/owner/pets");
    } else if (unsave === "1") {
      setGlobalMessage({
        message: "Ваші зміни не було збережено",
        variant: "warning",
      });
      router.replace("/owner/pets");
    } else if (deleted === "1" && name) {
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
      visible={!!globalMessage}
      onClose={hideMessage}
      message={globalMessage.message}
      variant={globalMessage.variant}
    />
  );
}
