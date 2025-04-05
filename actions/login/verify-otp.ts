"use server";

import { getOtpByIdentifier } from "@/data/otp";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";

export const verifyOtp = async (otp: string, identifier: string) => {
  try {
    const existingOtp = await getOtpByIdentifier(identifier);

    if (!existingOtp) return { error: "Invalid Code" };

    const hasExpired = new Date(existingOtp.expires) < new Date();
    if (hasExpired) {
      return { error: `Code has been expired` };
    }

    const isValidOtp = await bcrypt.compare(otp, existingOtp.otpCode);
    if (!isValidOtp) return { error: "Invalid Code" };

    await prisma.otp.delete({
      where: {
        identifier: existingOtp.identifier,
      },
    });

    return { success: "Seccuess" };
  } catch (error) {
    return { error: "Something Happended" };
  }
};
