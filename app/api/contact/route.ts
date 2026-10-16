import { siteConfig } from "@/lib/config";
import nodemailer from "nodemailer";
import { z } from "zod";

export const runtime = "nodejs"; // nodemailer requires Node.js runtime

const schema = z.object({
    name: z.string().min(2).max(100),
    email: z.string().email(),
    phone: z
        .string()
        .min(10)
        .max(20)
        .regex(/^[0-9()\-\s+]+$/, "Invalid phone number"),
    subject: z.string().min(2).max(120),
    message: z.string().min(5).max(1000),
    noMedicalInfoAck: z.literal(true),
    honeypot: z.string().max(0),
});

const rateLimit = new Map<string, number>();

function escapeHtml(input: string) {
    return input
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function getClientIp(req: Request) {
    const xff = req.headers.get("x-forwarded-for");
    if (xff) return xff.split(",")[0]?.trim() || "unknown";
    return req.headers.get("x-real-ip") || "unknown";
}

export async function POST(req: Request) {
    try {
        const ip = getClientIp(req);
        const ua = req.headers.get("user-agent") || "unknown";
        const key = `${ip}:${ua}`;

        // Basic rate limit: 1 request per 15 seconds per IP+UA
        const now = Date.now();
        const last = rateLimit.get(key) || 0;
        if (now - last < 15_000) {
            return Response.json({ error: "Too many requests" }, { status: 429 });
        }
        rateLimit.set(key, now);

        // Lightweight cleanup so the Map doesn't grow forever
        if (rateLimit.size > 5000) {
            const cutoff = now - 60 * 60 * 1000; // 1 hour
            for (const [k, ts] of rateLimit) {
                if (ts < cutoff) rateLimit.delete(k);
            }
        }

        const body = await req.json().catch(() => null);
        if (!body || typeof body !== "object") {
            return Response.json({ error: "Invalid payload" }, { status: 400 });
        }

        // Validate (do not log the payload)
        const parsed = schema.safeParse(body);
        if (!parsed.success) {
            return Response.json(
                { error: "Invalid form data" },
                { status: 400 }
            );
        }

        const data = parsed.data;

        // Honeypot: pretend success
        if (data.honeypot) {
            return Response.json({ ok: true });
        }

        // Build safe HTML and sanitize headers
        const safeName = escapeHtml(data.name);
        const safeEmail = escapeHtml(data.email);
        const safePhone = escapeHtml(data.phone);
        const cleanSubject = data.subject.replace(/[\r\n]+/g, " ").trim();
        const safeSubject = escapeHtml(cleanSubject);
        const safeMessage = escapeHtml(data.message).replace(/\n/g, "<br>");

        const transporter = nodemailer.createTransport({
            host: "smtppro.zoho.in",
            port: 465,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const to = process.env.CONTACT_RECEIVER;
        if (!to) {
            return Response.json({ error: "Server not configured" }, { status: 500 });
        }

        await transporter.sendMail({
            from: `Website General Inquiry <${process.env.SMTP_USER}>`,
            to,
            replyTo: data.email,
            subject: `Website Inquiry — ${cleanSubject}`,
            text: [
                "New website general inquiry (no medical info requested).",
                "",
                `Name: ${data.name}`,
                `Email: ${data.email}`,
                `Phone: ${data.phone}`,
                `Subject: ${cleanSubject}`,
                "",
                "Message:",
                data.message,
                "",
                `Sent from: ${siteConfig.name} contact page`,
            ].join("\n"),
            html: `
<div style="background:#f4f7fb;padding:40px 0;font-family:Arial,sans-serif">
  <table align="center" width="100%" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 5px 20px rgba(0,0,0,0.08)">
    <tr>
      <td style="background:#2563eb;color:#ffffff;padding:24px;text-align:center;font-size:22px;font-weight:bold">
        New Website General Inquiry
      </td>
    </tr>

    <tr>
      <td style="padding:26px 30px">
        <p style="margin:0 0 14px 0;font-size:14px;color:#374151">
          This message came from the website <b>general inquiries</b> form (users are instructed not to include medical details).
        </p>

        <table width="100%" style="border-collapse:collapse">
          <tr>
            <td style="padding:10px 0;color:#6b7280;font-size:14px">Name</td>
            <td style="padding:10px 0;font-weight:bold">${safeName}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;color:#6b7280;font-size:14px">Email</td>
            <td style="padding:10px 0;font-weight:bold">${safeEmail}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;color:#6b7280;font-size:14px">Phone</td>
            <td style="padding:10px 0;font-weight:bold">${safePhone}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;color:#6b7280;font-size:14px">Subject</td>
            <td style="padding:10px 0;font-weight:bold">${safeSubject}</td>
          </tr>
        </table>

        <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0"/>

        <p style="font-size:14px;color:#6b7280;margin:0 0 8px 0">Message</p>
        <div style="background:#f9fafb;border-radius:8px;padding:15px;font-size:15px;line-height:1.6;color:#111827">
          ${safeMessage}
        </div>

        <div style="text-align:center;margin-top:24px">
          <a href="mailto:${safeEmail}"
             style="background:#2563eb;color:#fff;text-decoration:none;padding:12px 22px;border-radius:8px;font-weight:bold;display:inline-block">
            Reply to ${safeName}
          </a>
        </div>

        <p style="margin:18px 0 0 0;font-size:12px;color:#9ca3af">
          Reminder: Please keep replies for general questions only and do not request medical details over email.
        </p>
      </td>
    </tr>

    <tr>
      <td style="background:#f9fafb;padding:16px;text-align:center;font-size:12px;color:#9ca3af">
        Sent from ${siteConfig.name} website contact form.<br/>
        © ${new Date().getFullYear()} ${siteConfig.name}
      </td>
    </tr>
  </table>
</div>
      `,
        });

        return Response.json({ success: true });
    } catch {
        // Avoid logging request bodies or user-provided content
        return Response.json({ error: "Server error" }, { status: 500 });
    }
}
