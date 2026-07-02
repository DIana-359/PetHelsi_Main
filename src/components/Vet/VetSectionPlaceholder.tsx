import Icon from "@/components/Icon";

interface Props {
  title: string;
  message: string;
  hint?: string;
  icon?: string;
}

export default function VetSectionPlaceholder({
  title,
  message,
  hint,
  icon = "icon-list",
}: Props) {
  return (
    <div className="flex h-full flex-col py-[8px] md:py-0">
      <h3 className="mb-[24px] text-[18px] font-[600] leading-[1] text-gray-900">
        {title}
      </h3>
      <div className="flex flex-1 flex-col items-center justify-center gap-[8px] text-center">
        <Icon
          sprite="/sprites/sprite-sistem.svg"
          id={icon}
          width="48px"
          height="48px"
          className="[--color1:currentColor] stroke-gray-350 text-gray-350"
        />
        <p className="text-[16px] font-[500] text-gray-900">{message}</p>
        {hint && (
          <p className="max-w-[320px] text-[14px] text-gray-500">{hint}</p>
        )}
      </div>
    </div>
  );
}
