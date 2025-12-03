"use client";
import { useEffect, useState } from "react";
import TableHeader from "@/components/History/TableHeader";
import { Pulse } from "@/components/Pulse";
import HistoryEmptyNotice from "@/components/History/HistoryEmptyNotice";
import HistoryCard from "@/components/History/HistoryCard";
import { IHistoryResponse } from "../../../types/historyTypes";

export default function History() {
  const [historyAllList, setHistoryAllList] = useState<IHistoryResponse | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/proxy/getHistoryAllItems")
      .then(res => res.json().then(data => ({ ok: res.ok, data })))
      .then(({ ok, data }) => {
        if (!ok) throw new Error(data.error || "Помилка завантаження");
        setHistoryAllList(data);
      })
      .catch(err => setError(err.message));
  }, []);

  if (error) return <div>Ошибка: {error}</div>;
  if (!historyAllList) return <Pulse />;
  if (!historyAllList.content.length) return <HistoryEmptyNotice />;
  const { content } = historyAllList;

  return (
    <section>
      {/* <HistoryFilterForm search={search} pet={pet} period={period} /> */}
      <TableHeader />
      <HistoryCard historyList={content} />
      {/* <HistoryPagination */}
      {/* currentPage={currentPage} */}
      {/* totalPages={totalPages} */}
    </section>
  );
}
