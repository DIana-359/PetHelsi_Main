export interface Vet {
  id: string;
  surname: string;
  name: string;
  patronymic: string;
  issueTypes: string[];
  rate: number;
}

export interface AppointmentSlot {
  id: string;
  dateTime: string;
  available: boolean;
}

export interface AppointmentData {
  vet: Vet;
  slot: AppointmentSlot;
  animalType: string;
  reason: string;
  price: number;
}