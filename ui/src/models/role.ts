export const ROLES = ["USER", "ADMIN", "SUPER_ADMIN"] as const;
export type Role = typeof ROLES[number];

export const isRole = (v: unknown): v is Role =>
  typeof v === "string" && (ROLES as readonly string[]).includes(v);

export const roleLabel: Record<Role, string> = {
  USER: "User",
  ADMIN: "Admin",
  SUPER_ADMIN: "Super Admin",
};

export const rolePriority: Record<Role, number> = {
  USER: 0,
  ADMIN: 10,
  SUPER_ADMIN: 20,
};
