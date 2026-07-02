export type RoleType = "CLIENT" | "VET" | "ADMIN" | "MANAGER";

// UI-selectable roles: owner vs veterinarian (subset of RoleType).
export type AuthRole = "CLIENT" | "VET";
export type AuthRoleWithEmpty = AuthRole | null;
