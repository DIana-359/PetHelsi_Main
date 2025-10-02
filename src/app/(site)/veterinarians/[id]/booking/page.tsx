"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
// import Stepper from "./stepper";
import { BookingAddPetModal } from "./BookingAddPetModal";
import { Pet } from "@/app/types/pet";
import { ModalBookingSuccess } from "./ModalBookingSuccess";
import { ModalBookingCancel } from "./ModalBookingCancel";
import { ModalBookingTimeLeft } from "./ModalBookingTimeLeft";
import OwnerNav from "@/components/Dashboard/OwnerNav";
import { Vet, AppointmentSlot, AppointmentData } from "@/utils/types/booking";
import { Pulse } from "@/components/Pulse";
import Icon from "@/components/Icon";
import clsx from "clsx";

const petTypeIcons: Record<string, string> = {
  Собака: "icon-dog",
  Кіт: "icon-cat",
  Птах: "icon-bird",
  Гризун: "icon-rabbit",
  Плазун: "icon-turtle",
  Інше: "icon-other",
};

const petTypePlural: Record<string, string> = {
  Собака: "Собаки",
  Кіт: "Коти",
  Птах: "Птахи",
  Гризун: "Гризуни",
  Плазун: "Плазуни",
};

export default function BookingPage() {
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
  console.log(error, setSelectedIssue);
  const [showModal, setShowModal] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [showModalCancel, setShowModalCancel] = useState(false);
  const [showModalTimeLeft, setShowModalTimeLeft] = useState(false);
  const [selectedPetTypes, setSelectedPetTypes] = useState<string[]>([]);

  const togglePetType = (petType: string) => {
    setSelectedPetTypes(prev =>
      prev.includes(petType)
        ? prev.filter(type => type !== petType)
        : [...prev, petType]
    );
  };

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

        const slotData: AppointmentSlot = {
          id: "1",
          dateTime: "2024-02-16T11:00:00Z",
          available: true,
        };

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
          animalType: userPets.map(p => p.petTypeName).join(", "),
          reason: "",
          price: vetData.rate,
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

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds === 0) {
          if (prev.minutes === 0) {
            setShowModalTimeLeft(true);
            clearInterval(timer);
            return { minutes: 0, seconds: 0 };
          }
          return { minutes: prev.minutes - 1, seconds: 59 };
        }
        return { ...prev, seconds: prev.seconds - 1 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAddPet = async (pet: Pet) => {
    try {
      const res = await fetch("/api/ownerProfile/add-pet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pet),
      });

      if (!res.ok) throw new Error("Помилка збереження тварини");

      const savedPet = await res.json();
      setPets(prev => [...prev, { ...savedPet, checked: true }]);
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
    setShowModalSuccess(true);
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
        date
          .toLocaleTimeString("uk-UA", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })
          .replace(":", ".") + " (GMT+02:00)",
    };
  };

  const formatDoctorName = (
    surname: string,
    name: string,
    patronymic: string
  ) => {
    return `${surname} ${name.charAt(0)}. ${patronymic.charAt(0)}.`;
  };
  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Pulse />
      </div>
    );
  return (
    <div className="flex gap-0">
      <div className="hidden md:block">
        <OwnerNav />
      </div>
      <div className="text-gray-500 pt-5 md:pt-8">
        <div className="flex flex-col lg:flex-row gap-6 mt-6">
          {/* Левая колонка - форма */}
          <div className="lg:w-1/2 bg-white p-6 rounded-lg">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              Бронювання запису
            </h1>
            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Оберіть або додайте тварину
              </h2>
              <div className="flex flex-wrap gap-2 mb-4">
                <button
                  onClick={() => setShowModal(true)}
                  className="flex items-center gap-2 border-2 border-primary bg-white rounded-lg px-4 py-3 text-primary hover:bg-primary-50 transition-colors font-lato">
                  <span className="text-lg">+</span>
                  Додати тварину
                </button>
                {appointmentData?.vet.petTypes &&
                  appointmentData.vet.petTypes.map((petType, index) => (
                    <button
                      key={`vet-pet-${index}`}
                      className={clsx(
                        "flex items-center gap-3 border-2 px-4 py-3 rounded-lg cursor-pointer transition-colors font-lato",
                        selectedPetTypes.includes(petType)
                          ? "bg-primary text-white border-primary"
                          : "bg-white text-primary border-primary hover:bg-primary-50"
                      )}
                      onClick={() => togglePetType(petType)}>
                      <Icon
                        sprite="/sprites/sprite-animals.svg"
                        id={petTypeIcons[petType] || "icon-dog"}
                        width="24"
                        height="24"
                        className={`stroke-1 scale-x-[-1] ${
                          selectedPetTypes.includes(petType)
                            ? "stroke-white"
                            : "stroke-primary"
                        }`}
                      />
                      <span>{petTypePlural[petType] || petType}</span>
                    </button>
                  ))}
              </div>
            </div>

            {selectedPetTypes.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Причина звернення*
                </h2>

                <select
                  value={selectedIssue}
                  onChange={e => setSelectedIssue(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:border-primary transition-colors font-lato">
                  <option value="Що турбує тварину?">Що турбує тварину?</option>
                  {appointmentData?.vet.issueTypes &&
                    appointmentData.vet.issueTypes.map((issue, index) => (
                      <option key={index} value={issue}>
                        {issue}
                      </option>
                    ))}
                </select>
              </div>
            )}

            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Надайте додаткову інформацію (за необхідності)
              </h2>
              <textarea
                placeholder="Опишіть більш детальніше, що саме турбує тварину"
                className="w-full border border-gray-300 rounded-lg p-3 text-primary-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={4}
                value={additionalInfo}
                onChange={e => setAdditionalInfo(e.target.value)}
              />
            </div>
            <button
              onClick={handleSubmit}
              disabled={timeLeft.minutes === 0 && timeLeft.seconds === 0}
              className="w-full bg-primary text-white py-4 px-6 rounded-lg hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-lato font-medium">
              Перейти до оплати
            </button>
          </div>
          <div className="lg:w-1/2 bg-white p-6 rounded-lg">
            <div
              className="border border-gray-200 rounded-lg p-4 mb-6 flex items-center gap-2"
              style={{ backgroundColor: "#F5F9FE" }}>
              <p className="text-xl font-bold text-gray-800">
                {timeLeft.minutes} хв :{" "}
                {timeLeft.seconds.toString().padStart(2, "0")} сек
              </p>
              <p className="text-sm text-gray-600">до завершення бронювання</p>
            </div>
            {appointmentData && (
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="font-medium text-gray-700">Тварина:</div>
                  <div className="text-gray-600">
                    {appointmentData.animalType}
                  </div>

                  <div className="font-medium text-gray-700">Дата:</div>
                  <div className="text-gray-600">
                    {formatDateTime(appointmentData.slot.dateTime).date}
                  </div>

                  <div className="font-medium text-gray-700">Час:</div>
                  <div className="text-gray-600">
                    {formatDateTime(appointmentData.slot.dateTime).time}
                  </div>

                  <div className="font-medium text-gray-700">Лікар:</div>
                  <div className="text-gray-600">
                    {formatDoctorName(
                      appointmentData.vet.surname,
                      appointmentData.vet.name,
                      appointmentData.vet.patronymic
                    )}
                  </div>

                  <div className="font-medium text-gray-700">
                    Причина звернення:
                  </div>
                  <div className="text-gray-600">
                    {appointmentData?.vet.issueTypes &&
                    appointmentData.vet.issueTypes.length > 0
                      ? appointmentData.vet.issueTypes.join(" , ")
                      : "—"}
                  </div>
                </div>
              </div>
            )}

            <div className="border-t border-b border-gray-200 py-4 my-4">
              <div className="flex justify-between items-center">
                <div className="font-bold text-gray-800">Вартість:</div>
                <div className="font-bold text-gray-800">
                  {appointmentData?.vet.rate || 0} UAH
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowModalCancel(true)}
              className="w-full border border-gray-300 text-red-500 py-2 px-4 rounded-lg hover:bg-gray-50">
              Скасувати бронювання
            </button>
          </div>
        </div>
      </div>

      {/* Модалки */}
      {showModal && (
        <BookingAddPetModal
          isOpen={showModal}
          handleAddPet={handleAddPet}
          onClose={() => setShowModal(false)}
        />
      )}

      {showModalSuccess && (
        <ModalBookingSuccess
          isOpen={showModalSuccess}
          onClose={() => setShowModalSuccess(false)}
        />
      )}
      {showModalCancel && (
        <ModalBookingCancel
          isOpen={showModalCancel}
          onClose={() => setShowModalCancel(false)}
        />
      )}
      {showModalTimeLeft && (
        <ModalBookingTimeLeft
          isOpen={showModalTimeLeft}
          setTimeLeft={() => setTimeLeft({ minutes: 14, seconds: 58 })}
          onClose={() => setShowModalTimeLeft(false)}
        />
      )}
    </div>
  );
}
