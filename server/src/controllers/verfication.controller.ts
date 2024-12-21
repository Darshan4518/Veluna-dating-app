import { Request, Response } from "express";
import { prisma } from "..";

// Function to send verification code
export const sendCode = async (req: Request, res: Response) => {
  const { phoneNumber } = req.body;

  try {
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    await prisma.verification.upsert({
      where: { phoneNumber },
      update: { code: verificationCode },
      create: { phoneNumber, code: verificationCode },
    });

    res.status(200).json({
      success: true,
      message: "Verification code generated successfully!",
      code: verificationCode,
    });
  } catch (error) {
    console.error("Error generating verification code:", error);
    res.status(500).json({ error: "Failed to generate verification code." });
  }
};

// Function to verify and store user
export const verifyAndStoreUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { phoneNumber, code } = req.body;

  try {
    const verificationRecord = await prisma.verification.findUnique({
      where: { phoneNumber },
    });

    if (!verificationRecord || verificationRecord.code !== code) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid verification code." });
    }

    let user = await prisma.user.findUnique({ where: { phoneNumber } });
    if (!user) {
      user = await prisma.user.create({
        data: { phoneNumber, isVerified: true },
      });
    }

    await prisma.verification.delete({ where: { phoneNumber } });

    res
      .status(200)
      .json({ success: true, message: "Verification successful!", user });
  } catch (error) {
    console.error("Error verifying code:", error);
    res.status(500).json({ error: "Failed to verify code." });
  }
};

export const resendCode = async (req: Request, res: Response) => {
  const { phoneNumber } = req.body;

  try {
    const verificationRecord = await prisma.verification.findUnique({
      where: { phoneNumber },
    });

    if (!verificationRecord) {
      return res.status(404).json({
        success: false,
        message: "Phone number not found. Please request a new code.",
      });
    }

    const newCode = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.verification.update({
      where: { phoneNumber },
      data: { code: newCode },
    });

    res.status(200).json({
      success: true,
      message: "Verification code resent successfully!",
      code: newCode,
    });
  } catch (error) {
    console.error("Error resending verification code:", error);
    res.status(500).json({ error: "Failed to resend verification code." });
  }
};
