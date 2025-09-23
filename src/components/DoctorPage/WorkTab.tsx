import { Veterinarian } from "@/utils/types/veterinarian";

type Props = {
  veterinarian: Veterinarian;
};
const WorkTab = ({ veterinarian }: Props) => {
  return (
    <div className="flex flex-col  gap-8">
      <h3 className=" text-[16px]  md:text-[18px] lg:text-[18px] font-semibold mb-4">
        Поточне місце роботи
      </h3>
      <div className="flex flex-col mb-8 gap-1">
        <p className="text-[16px] text-gray-900">
          {veterinarian.organization.city}
        </p>
        <p className="text-gray-500">{veterinarian.organization.name}</p>
      </div>
    </div>
  );
};

export default WorkTab;
