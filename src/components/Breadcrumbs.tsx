import Link from "next/link";
import Icon from "./Icon";

type Segment = {
  label: string;
  href?: string;
};

export default function Breadcrumbs({
  segments = [],
}: {
  segments?: Segment[];
}) {
  return (
    <div className="flex items-center gap-1  text-[14px] lg:text-[12px] font-medium">
      <Link href={"/"} className="text-gray-500 hidden md:inline">
        Головна
      </Link>
      {segments.map((seg, index) => (
        <div
          key={index}
          className="flex items-center gap-1 md:flex
    [&:not(:first-of-type)]:hidden
    md:[&:not(:first-of-type)]:flex"
        >
          <Icon
            sprite="/sprites/sprite-sistem.svg"
            id="icon-expand_right_light"
            width="20px"
            height="20px"
            className="fill-gray-500 w-[20px] h-[20px] rotate-180 md:rotate-0"
          />
          {seg.href ? (
            <Link href={seg.href} className="text-gray-500">
              {seg.label}
            </Link>
          ) : (
            <span className="text-gray-700">{seg.label}</span>
          )}
        </div>
      ))}
    </div>
  );
}
