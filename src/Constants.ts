import { NavItemType } from "./types/ownerTypes";

export const NAV_ITEMS = [
  { name: "Про нас", href: "#features" },
  { name: "Ветеринари", href: "#veterinarians" },
  { name: "FAQ", href: "#faq" },
];

export const NAV_ITEMS_OWNER = [
  {
    category: "history",
    text: "Історія прийомів",
    alt: "history",
    icon: "icon-list",
  },
  {
    category: "chats",
    text: "Чати",
    alt: "chats",
    icon: "icon-message_light",
  },
  {
    category: "pets",
    text: "Мої тварини",
    alt: "pets",
    icon: "icon-paw",
  },
  {
    category: "veterinarians",
    text: "Ветеринари",
    alt: "veterinarians",
    icon: "icon-group",
  },
  {
    category: "profile",
    text: "Мій профіль",
    alt: "profile",
    icon: "icon-user",
  },
  {
    category: "settings",
    text: "Налаштування",
    alt: "settings",
    icon: "icon-settings",
  },
] as NavItemType[];

export const optionsAnimals = [
  { value: "Собака", key: "Собака", icon: "icon-dog" },
  { value: "Кіт", key: "Кіт", icon: "icon-cat" },
  { value: "Гризун", key: "Гризун", icon: "icon-rabbit" },
  { value: "Птах", key: "Птах", icon: "icon-bird" },
  { value: "Плазун", key: "Плазун", icon: "icon-turtle" },
  { value: "Інше", key: "Інше", icon: "icon-other" },
];

export const optionsProblems = [
  {
    value: "Проблеми із травленням",
    key: "Проблеми із травленням",
    icon: "icon-digestive-problems",
  },
  {
    value: "Шкірні/вушні інфекції",
    key: "Шкірні/вушні інфекції",
    icon: "icon-skin-infection",
  },
  {
    value: "Проблеми з очима",
    key: "Проблеми з очима",
    icon: "icon-eye-problems",
  },
  { value: "Блохи/кліщі", key: "Блохи/кліщі", icon: "icon-insects" },
  {
    value: "Травмування частин тіла",
    key: "Травмування частин тіла",
    icon: "icon-bones",
  },
  {
    value: "Догляд та утримання",
    key: "Догляд та утримання",
    icon: "icon-care",
  },
  {
    value: "Алергічна реакція",
    key: "Алергічна реакція",
    icon: "icon-allergy",
  },
  { value: "Інше", key: "Інше", icon: "icon-allproblems" },
];

export const WEEK_DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"] as const;
