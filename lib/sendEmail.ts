import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendEmail(to: string, subject: string, body: string) {
  try {
    const res = await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to,
      subject,
      html: `<div>${body.replace(/\n/g, "<br>")}</div>`,
    });
    return res;
  } catch (err) {
    console.error("Error sending email:", err);
    throw err;
  }
}
