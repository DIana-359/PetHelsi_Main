export interface Pet {
  id: string;
  name: string;
  type: string;
  breed: string;
  sex?: string;
  weight?: number;
  age?: number;
  checked: boolean;
}