import nodemailer from "nodemailer";

const buildTransport = () => {
  if (!process.env.SMTP_HOST) return null;
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      : undefined,
  });
};

export const sendEmail = async ({ to, subject, text, html }) => {
  const transporter = buildTransport();
  if (!transporter) {
    console.warn("SMTP not configured. Skipping email send.");
    return;
  }

  const from = process.env.FROM_EMAIL || "no-reply@example.com";
  await transporter.sendMail({
    from,
    to,
    subject,
    text,
    html,
  });
};
