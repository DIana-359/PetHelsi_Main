"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Stepper from "./stepper";
import { BookingAddPetModal } from "./BookingAddPetModal";
import { Pet } from "@/app/types/pet";
import OwnerNav from "@/components/Dashboard/OwnerNav";

interface Vet {
  id: string;
  surname: string;
  name: string;
  patronymic: string;
  issueTypes: string[];
  rate: number;
}

interface AppointmentSlot {
  id: string;
  dateTime: string;
  available: boolean;
}

interface AppointmentData {
  vet: Vet;
  slot: AppointmentSlot;
  animalType: string;
  reason: string;
  price: number;
}

export default function BookingPage() {
  const router = useRouter();
  const params = useParams();
  const vetId = params?.id as string;

  const [pets, setPets] = useState<Pet[]>([]);
  const [selectedIssue, setSelectedIssue] = useState("Що турбує тварину?");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [timeLeft, setTimeLeft] = useState({ minutes: 14, seconds: 58 });
  const [appointmentData, setAppointmentData] =
    useState<AppointmentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showModal, setShowModal] = useState(false);
  // const [newPet, setNewPet] = useState<Partial<Pet>>({});

  // Загрузка данных ветеринара и животных
  useEffect(() => {
    if (!vetId) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const vetRes = await fetch(
          `https://om6auk3tiqy3ih6ad5ad2my63q0xmqcs.lambda-url.eu-north-1.on.aws/api/v1/vets/${vetId}`
        );
        if (!vetRes.ok) throw new Error("Помилка завантаження даних лікаря");
        const vetData: Vet = await vetRes.json();

        // Mock slot
        const slotData: AppointmentSlot = {
          id: "1",
          dateTime: "2024-02-16T11:00:00Z",
          available: true,
        };

        // Загружаем животных пользователя с сервера
        const petsRes = await fetch(
          `https://om6auk3tiqy3ih6ad5ad2my63q0xmqcs.lambda-url.eu-north-1.on.aws/api/v1/users/pets`
        );
        const userPets: Pet[] = petsRes.ok ? await petsRes.json() : [];

        setPets(
          userPets.map((p, idx) => ({
            ...p,
            checked: true,
            id: p.id?.toString() || (idx + 1).toString(),
          }))
        );
        setAppointmentData({
          vet: vetData,
          slot: slotData,
          animalType: userPets.map(p => p.petTypeName).join(', '),
          reason: '',
          price: vetData.rate
        });
      } catch (err) {
        console.error(err);
        setError("Не вдалося завантажити дані");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [vetId]);

  // Таймер
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds === 0) {
          if (prev.minutes === 0) {
            clearInterval(timer);
            return { minutes: 0, seconds: 0 };
          }
          return { minutes: prev.minutes - 1, seconds: 59 };
        }
        return { ...prev, seconds: prev.seconds - 1 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const togglePet = (id: string) => {
    setPets(pets.map(p => (p.id === id ? { ...p, checked: !p.checked } : p)));
  };

  const handleAddPet = async (pet: Pet) => {
    try {
      const res = await fetch('/api/ownerProfile/add-pet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pet),
      });

      if (!res.ok) throw new Error("Помилка збереження тварини");

      const savedPet = await res.json();
      setPets((prev) => [...prev, { ...savedPet, checked: true }]);
    } catch (err) {
      console.error(err);
      alert("Не вдалося зберегти тварину");
    }
  };

  const handleSubmit = async () => {
    if (pets.every(p => !p.checked)) {
      alert("Оберіть хоча б одну тварину");
      return;
    }
    const reason =
      selectedIssue !== "Що турбує тварину?" ? selectedIssue : additionalInfo;
    setAppointmentData(prev => (prev ? { ...prev, reason } : prev));

    await new Promise(resolve => setTimeout(resolve, 500));
    alert("Бронювання успішне!");
    router.push("/success");
  };

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return {
      date: date.toLocaleDateString("uk-UA", {
        weekday: "short",
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      time:
        date.toLocaleTimeString("uk-UA", {
          hour: "2-digit",
          minute: "2-digit",
        }) + " (GMT+02:00)",
    };
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        Завантаження...
      </div>
    );

  return (
    <div className="flex gap-0">
      <div className="hidden md:block">
        <OwnerNav />
      </div>
      <div className="flex flex-col md:flex-row gap-6 p-4 max-w-6xl mx-auto">
        <div className="md:w-1/2 bg-white p-6 rounded-lg shadow">
          <div className="p-8">
            <Stepper
              steps={[
                { label: "Дані прийому", status: "completed" },
                { label: "Дані тварини", status: "active" },
                { label: "Оплата", status: "upcoming" },
              ]}
            />
          </div>

          {error && (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
              ⚠️ {error}
            </div>
          )}

          {/* Животные и кнопка добавления */}
          <div className="flex gap-3 mb-4 flex-wrap">
            {pets.map(pet => (
              <button
                key={pet.id}
                className={`px-3 py-1 border rounded ${
                  pet.checked
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => togglePet(pet.id!)}>
                {pet.name}
              </button>
            ))}
            <button
              onClick={() => setShowModal(true)}
              className="px-3 py-1 border border-dashed rounded text-blue-500">
              + Додати тварину
            </button>
          </div>

          {/* Выпадающее меню */}
          <select
            className="w-full border border-gray-300 rounded p-2 mb-4"
            value={selectedIssue}
            onChange={e => setSelectedIssue(e.target.value)}>
            <option>Що турбує тварину?</option>
            {appointmentData?.vet.issueTypes.map((issue, idx) => (
              <option key={idx} value={issue}>
                {issue}
              </option>
            ))}
          </select>

          {/* Текстовое поле */}
          <textarea
            placeholder="Опишіть більш детально, що саме турбує тварину"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 mb-6"
            rows={4}
            value={additionalInfo}
            onChange={e => setAdditionalInfo(e.target.value)}
          />

          <div className="flex space-x-4">
            <button
              onClick={() => router.back()}
              className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              Скасувати
            </button>
            <button
              onClick={handleSubmit}
              disabled={timeLeft.minutes === 0 && timeLeft.seconds === 0}
              className="flex-1 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400">
              Продовжити
            </button>
          </div>
        </div>

        <div className="md:w-1/2 bg-white p-6 rounded-lg shadow">
          <div className="text-center mb-6">
            <p className="text-xl font-bold">
              {timeLeft.minutes} хв :{" "}
              {timeLeft.seconds.toString().padStart(2, "0")} сек
            </p>
            <p className="text-sm text-gray-500">до завершення бронювання</p>
          </div>

          {appointmentData && (
            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="font-medium">Тварина:</div>
                <div>{appointmentData.animalType}</div>

                <div className="font-medium">Дата:</div>
                <div>{formatDateTime(appointmentData.slot.dateTime).date}</div>

                <div className="font-medium">Час:</div>
                <div>{formatDateTime(appointmentData.slot.dateTime).time}</div>

                <div className="font-medium">Врач:</div>
                <div>
                  {appointmentData.vet.surname} {appointmentData.vet.name}{" "}
                  {appointmentData.vet.patronymic}
                </div>

                <div className="font-medium">Спеціалізація:</div>
                <div>{appointmentData.vet.issueTypes.join(", ")}</div>

                <div className="font-medium">Причина звернення:</div>
                <div>
                  {selectedIssue !== "Що турбує тварину?"
                    ? selectedIssue
                    : additionalInfo}
                </div>
              </div>
            </div>
          )}

          <div className="border-t border-b py-4 my-4">
            <div className="grid grid-cols-2 gap-4 font-bold">
              <div>Вартість:</div>
              <div>{appointmentData?.vet.rate || 0} UAH</div>
            </div>
          </div>

          <button
            onClick={() => router.back()}
            className="w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            Скасувати бронювання
          </button>
        </div>

        {/* Модалка добавления животного */}
        {showModal && (
          <BookingAddPetModal
            isOpen={showModal}
            handleAddPet={handleAddPet}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </div>
  );
}
