import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `https://blogging-app-rh8v.vercel.app/new-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset Your Password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password. If you have not initiated password reset, then ignore this email.</p>`,
  });
};
