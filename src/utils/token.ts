import { v4 as uuidv4 } from "uuid";
import { getPasswordResetTokenByEmail } from "./password-reset-token";
import prisma from "./connect";

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await prisma.resetPasswordToken.delete({
      where: { id: existingToken.id },
    });
  }

  const passwordResetToken = await prisma.resetPasswordToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;
};
