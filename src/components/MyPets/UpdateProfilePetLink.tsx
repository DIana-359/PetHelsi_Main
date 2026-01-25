import Link from "next/link";
import Icon from "../Icon";

export default function UpdateProfilePetLink() {
  const petId = "123";
  return (
    <div className="py-[10px] px-[16px] flex items-center gap-[8px] group">
      <Icon
        sprite="/sprites/sprite-sistem.svg"
        id="icon-pen"
        width="20px"
        height="20px"
        className="stroke-gray-700 fill-background group-hover:stroke-primary-900"
      />
      <Link href={`/owner/pets/edit-pet/${petId}`}>
        <span className="text-[14px] font-[400] leading-[1] text-primary-700 group-hover:text-primary-900">
          Редагувати
        </span>
      </Link>
    </div>
  );
}
