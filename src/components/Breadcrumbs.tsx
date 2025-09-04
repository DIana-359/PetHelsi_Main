import Link from 'next/link';
import Icon from './Icon';

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
    <div className="flex items-center gap-1 mt-8 text-xs font-medium">
      <Link href={'/'} className="text-gray-500">
        Головна
      </Link>
      {segments.map((seg, index) => (
        <div key={index} className="flex items-center gap-1">
          <Icon
            sprite="/sprites/sprite-sistem.svg"
            id="icon-expand_right_light"
            width="20px"
            height="20px"
            className="fill-gray-500 w-[20px] h-[20px]"
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
