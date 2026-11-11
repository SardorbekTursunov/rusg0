import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Email manzilini to‘g‘ri kiriting."),
  password: z.string().min(1, "Parolni kiriting."),
});

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(2, "Ismingiz kamida 2 ta belgidan iborat bo‘lsin.")
      .max(60, "Ism juda uzun."),
    username: z
      .string()
      .min(3, "Username kamida 3 ta belgidan iborat bo‘lsin.")
      .max(20, "Username juda uzun.")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username faqat harflar, raqamlar va _ dan iborat bo‘lsin.",
      ),
    email: z.email("Email manzilini to‘g‘ri kiriting."),
    password: z
      .string()
      .min(6, "Parol kamida 6 ta belgidan iborat bo‘lsin.")
      .max(72, "Parol juda uzun."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Parollar mos kelmadi.",
    path: ["confirmPassword"],
  });

export const profileSchema = z.object({
  username: z
    .string()
    .min(3, "Username kamida 3 ta belgidan iborat bo‘lsin.")
    .max(20, "Username juda uzun.")
    .regex(/^[a-zA-Z0-9_]+$/, "Faqat harflar, raqamlar va _."),
  fullName: z.string().min(2, "Ism kamida 2 ta belgi.").max(60),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ProfileInput = z.infer<typeof profileSchema>;
