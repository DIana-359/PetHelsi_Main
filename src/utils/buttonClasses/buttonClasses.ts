export type ButtonVariant = "primary" | "secondary";

export const getButtonClasses = (variant: ButtonVariant, isActive: boolean) => {
  switch (variant) {
    case "primary":
      return `w-full rounded-[8px] transition-colors ${
        isActive
          ? "bg-primary-700 text-white"
          : "bg-white text-primary-700 border border-primary-700"
      }`;
    case "secondary":
      return `w-full rounded-[8px] transition-colors ${
        isActive
          ? "bg-secondary-700 text-white"
          : "bg-white text-secondary-700 border border-secondary-700"
      }`;
    default:
      return "w-full rounded-[8px]";
  }
};
