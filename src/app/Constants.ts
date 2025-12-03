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
  }
] as NavItemType[]

export const WEEK_DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];

