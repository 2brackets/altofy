import { z } from "zod";

const emailSchema = z.string().trim().email();
const passwordSchema = z.string().trim().min(1); 

export function isValidEmail(email: string): boolean {
  return emailSchema.safeParse(email).success;
}

export function isValidPassword(password: string): boolean {
  return passwordSchema.safeParse(password).success;
}
