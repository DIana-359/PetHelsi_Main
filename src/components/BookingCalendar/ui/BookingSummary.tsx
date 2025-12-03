import { Button } from "@heroui/react";
import { useBooking } from "@/contextBooking/contextBooking";

interface Props {
  onBook: () => void;
}

export default function BookingSummary({
  onBook
}: Props) {
  const {price} = useBooking()

  return (
    <div>
      <div className="flex justify-between items-center text-lg font-medium mb-4 text-gray-900">
        <p>Вартість</p>
        <p>{price} UAH</p>
      </div>

      <Button
        onPress={onBook}
        className="w-full px-6 py-4 rounded-[8px] text-white text-[16px] h-11"
        radius="sm"
        color="primary"
        type="button"
      >
        Забронювати обраний час
      </Button>
    </div>
  );
}
