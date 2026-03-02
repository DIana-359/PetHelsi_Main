export type ButtonVariant = "primary" | "secondary" | "danger";

export const getButtonClasses = (variant: ButtonVariant, isActive: boolean) => {
  switch (variant) {
    case "primary":
      return `w-full rounded-[8px] transition-colors ${
        isActive
          ? "bg-primary-700 text-white"
          : "bg-white text-primary-700 border border-primary-700 hover:bg-primary-50"
      }`;
    case "secondary":
      return `w-full rounded-[8px] transition-colors ${
        isActive
          ? "bg-primary-700 text-white"
          : "bg-white text-primary-700 border border-primary-700 hover:bg-primary-50"
      }`;

    case "danger":
      return "w-full rounded-[8px] border bg-white text-[#f11c0e] hover:border-[#f11c0e] hover:bg-danger-50";

    default:
      return "w-full rounded-[8px]";
  }
};
