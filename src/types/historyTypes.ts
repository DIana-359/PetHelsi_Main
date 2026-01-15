export type StatusType = "BOOKED" | "CANCELLED" | "COMPLETED";

export interface IConclusion {
  id: number;
  diagnosis: string;
  prescription: string;
  treatment: string;
  nextVisit: string;
}
export interface IHistoryItem {
  patientId: number;
  patientName: string;
  patientAvatar: string | null;
  petTypeName: string;
  statusType: StatusType;
  doctorId: number;
  doctorShortName: string;
  appointmentSlotId: number;
  date: string;
  time: string;
  price: number;
  complaint: string;
  conclusion: IConclusion | null;
}

export interface IHistoryResponse {
  content: IHistoryItem[];
  totalElements: number;
  totalPages: number;
}
