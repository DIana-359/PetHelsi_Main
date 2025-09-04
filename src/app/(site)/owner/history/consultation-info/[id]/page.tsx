"use client";
import { useEffect, useState } from "react";
import GoBack from "@/components/GoBack";
import HistoryDetailsConsultationHeader from "@/components/History/HistoryConsultationHeader";
import HistoryMedicalReport from "@/components/History/HistoryMedicalReport";
import { IHistoryItem } from "@/app/types/historyTypes";
import HistoryUploadedFiles from "@/components/History/HistoryUploadedFiles";
import { Pulse } from "@/components/Pulse";
import { useParams } from "next/navigation";

export default function ConsultationInfo() {
  const { id } = useParams();
  const [historyItem, setHistoryItem] = useState<IHistoryItem | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isOpenUpdatehistory, setOpenUpdatehistory] = useState<boolean>(false);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/proxy/getHistoryById?id=${id}`, {
      credentials: "include",
    })
      .then(async res => {
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Помилка завантаження");
        }
        return res.json();
      })
      .then(setHistoryItem)
      .catch(err => setError(err.message));
  }, [id]);

  if (error) return <div>Помилка: {error}</div>;
  if (!historyItem) return <Pulse />;

  if (Object.keys(historyItem).length === 0) {
    return (
      <section>
        <div className="mb-[16px]">
          <GoBack />
        </div>
        <div>Звіт не знайдено.</div>
      </section>
    );
  }

  return (
    <section>
      <div className="mb-[24px] 2xl:mb-[16px]">
        <GoBack />
      </div>
      <HistoryDetailsConsultationHeader
        historyItem={historyItem}
        id={`${historyItem.appointmentSlotId}`}
      />

      <div className="relative mb-[48px]">
        <HistoryMedicalReport
          historyItem={historyItem}
          setHistoryItem={setHistoryItem}
          isOpenUpdatehistory={isOpenUpdatehistory}
          setOpenUpdatehistory={setOpenUpdatehistory}
        />
      </div>

      <HistoryUploadedFiles historyItem={historyItem} />
    </section>
  );
}
