export default function TableHeader() {
  const historyTableHeader = [
    "Тварина",
    "Статус",
    "Лікар",
    "Дата",
    "Час",
    "Вартість",
    "Скарги/причина звернення",
  ];

  return (
    <ul className="hidden 2xl:grid gap-[6px] py-[20px] px-[12px] border-b-[1px] border-gray-100 grid-cols-[152px_104px_132px_96px_64px_88px_292px]">
      {historyTableHeader.map((item, index) => (
        <li
          key={index}
          className="text-[14px] leading-[1.4] font-[600] text-gray-950 flex items-center">
          {item}
        </li>
      ))}
    </ul>
  );
}
