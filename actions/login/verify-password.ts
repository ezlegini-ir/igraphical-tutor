"use server";

import { getTutorByIdentifier } from "@/data/admin";

export async function verifyPassword(identifier: string, password: string) {
  const existingUser = await getTutorByIdentifier(identifier);

  if (!existingUser) return { error: "No User Found" };

  //TODO: BCRYPT PASSWORD COMPARE
  const isValidPassword = existingUser.adminPassword?.password === password;

  if (!isValidPassword) return { error: "رمز عبور معتبر نمی باشد" };

  return { success: "Password Matched" };
}
