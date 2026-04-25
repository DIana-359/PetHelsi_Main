export const authCookieOptions = {
  httpOnly: true as const,
  sameSite: "lax" as const,
  path: "/",
  secure:
    process.env.VERCEL_ENV === "production" ||
    process.env.VERCEL_ENV === "preview",
};
