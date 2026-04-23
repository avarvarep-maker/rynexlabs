import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
  service: z.string().optional(),
  phone: z.string().optional(),
  notes: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: "RynexLabs <noreply@rynexlabs.com>",
        to: "avarvarep@gmail.com",
        replyTo: data.email,
        subject: `New message from ${data.name} — ${data.service || "Contact form"}`,
        text: `
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || "Not provided"}
Service: ${data.service || "Not specified"}

Message:
${data.message}
${data.notes ? `\nNotes: ${data.notes}` : ""}
        `.trim(),
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
