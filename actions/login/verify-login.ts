"use server";

import { getTutorByIdentifier } from "@/data/admin";
import { sendOtp } from "@/lib/otp";
import { isHumanOrNot } from "@/lib/recaptcha";
import bcrypt from "bcrypt";

export const verifyLogin = async (
  identifier: string,
  password: string,
  recaptchaToken: string
) => {
  try {
    await isHumanOrNot(recaptchaToken);

    const existingTutor = await getTutorByIdentifier(identifier);
    if (!existingTutor) return { error: "Invalid Credentials" };

    const isValidPassword = await bcrypt.compare(
      password,
      existingTutor.password
    );

    if (!isValidPassword) return { error: "Invalid Credentials" };

    await sendOtp(identifier);
  } catch (error) {
    return { error: String(error) };
  }
};
