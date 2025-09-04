import { Veterinarian } from '@/utils/types/veterinarian';
import DocReviews from './DocReviews';



type Props = {
  veterinarian: Veterinarian;
};
const WorkTab = ({ veterinarian }: Props) => {
  return (
    <div className="flex flex-col gap-8">
      <h3 className="text-[18px] font-semibold mb-4">Поточне місце роботи</h3>
      <div className="flex flex-col gap-1">
        <p className="text-[16px] text-gray-900">
          {veterinarian.organization.city}
        </p>
        <p className="text-gray-500">
          {veterinarian.organization.name}
        </p>
      </div>
      <DocReviews reviews={veterinarian.reviews} />
    </div>
  );
};

export default WorkTab;
