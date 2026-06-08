export interface GetVetsParams {
  page?: number;
  size?: number;
  sort?: string;
  petTypeName?: string;
  issueTypeName?: string;
  date?: string;
}

export type Vet = {
  id: number;
  surname: string;
  name: string;
  patronymic: string;
  experience: number;
  rating: number;
  rate: number;
  active: boolean;
  status: boolean;
  email: string;
};

export type PageInfo = {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
};

export type VetsResponse = {
  content: Vet[];
  page: PageInfo;
};