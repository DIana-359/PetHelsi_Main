export interface Vet {
  id: string;
  surname: string;
  name: string;
  patronymic: string;
  rating: number;
  experience: number;
  rate: number;
  description: string;
  photoUrl: string;
  userId: string;
  userEmail: string;
  organization: {
    name: string;
    city: string;
  };
  issueTypes: string[];
  petTypes: string[];
  educations: {
    id: string;
    institution: string;
    startYear: string;
    endYear: string;
    diplomaUrls: string[];
  }[];
  additionals: {
    id: string;
    courseName: string;
    institution: string;
    startDate: string;
    endDate: string;
    certificateUrl: string;
  }[];
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