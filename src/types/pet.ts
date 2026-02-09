export interface Pet {
  id?: number;
  name: string;
  petTypeName: string;
  breed?: string;
  genderTypeName: string;
  weight: number;
  birthDate?: string;
  avatar?: string;
  sterilized: boolean;
  allergies?: string[];
  color?: string;
  checked: boolean;
}
