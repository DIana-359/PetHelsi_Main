export enum Category {
  history = "Історія прийомів",
  chats = "Чати",
  pets = "Мої тварини",
  veterinarianse = "Ветеринари",
  profile = "Мій профіль",
  settings = "Налаштування",
}

export type CategoryValue = `${Category}`;

export type NavItemType = {
  category: keyof typeof Category;
  alt: keyof typeof Category;
  text: CategoryValue;
  icon: string;
};

export interface IProfileOwner {
  firstName: string;
  lastName: string;
  middleName: string;
  phone: string;
  city: string;
  email: string;
  birthday: string;
  avatar?: string;
}

export interface IProfileUpdate {
  firstName: string;
  lastName: string;
  middleName: string;
  phone: string;
  city: string;
  birthday: string;
}
