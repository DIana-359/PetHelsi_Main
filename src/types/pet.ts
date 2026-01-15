export interface Pet {
  id?: string;
  name: string;
  petTypeName: string;
  breed: string;
  genderTypeName?: string;
  weight?: number;
  ages?: number;
  checked: boolean;
}