"use client";
import { IHistoryItem } from "@/app/types/historyTypes";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoSaveOutline } from "react-icons/io5";

type InputValueUpdateProps = {
  complaint: string;
  setHistoryItem?: (value: IHistoryItem) => void;
  setOpenUpdatehistory?: (value: boolean) => void;
};

export default function InputUpdateComplaint({
  complaint,
  setHistoryItem,
  setOpenUpdatehistory,
}: InputValueUpdateProps) {
  const { id } = useParams();
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  function handleUpdateComplaint() {
    if (!value.trim()) {
      setError("Поле не може бути порожнім");
      return;
    }

    fetch(`/api/proxy/updateComplaint?id=${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ complaint: value }),
    })
      .then(async res => {
        if (!res.ok) {
          const err = await res.json();
          console.error("API error body:", err);
          throw new Error(err.error || "Помилка завантаження");
        }
        setOpenUpdatehistory?.(false);
        return res.json();
      })
      .then(setHistoryItem)
      .catch(err => setError(err.message));
  }

  useEffect(() => {
    setValue(complaint || "");
  }, [complaint]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= 255) {
      setValue(newValue);
      if (error) setError(null);
    }
  };

  const handleBlur = () => {
    if (value.trim() === "") {
      setError("Поле не може бути порожнім");
    } else {
      setError(null);
    }
  };

  return (
    <div className="flex flex-col gap-1 relative max-w-[576px]">
      <textarea
        value={value}
        placeholder="Опишіть симптоми або зміни стану тварини"
        onChange={handleChange}
        onBlur={handleBlur}
        className={`border pt-[12px] pl-[12px] pr-[24px] pb-[24px] rounded text-[14px] leading-[1] font-[400] placeholder-gray-300 placeholder-text-[14px] bg-background ${
          error ? "border-error-500" : "border-primary-300"
        }    focus:border-primary-700 focus:outline-none resize-none overflow-y-auto max-h-[138px]`}
        rows={3}
      />
      <IoSaveOutline
        onClick={handleUpdateComplaint}
        className="w-[20px] h-[20px] stroke-primary-700 absolute bottom-[10px] right-[10px]"
      />
      {error && (
        <span className="text-error-500 text-[12px] leading-[1] font-[400] absolute -bottom-3 left-0">
          {error}
        </span>
      )}
    </div>
  );
}
