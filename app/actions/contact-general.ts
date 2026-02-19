"use server";

import nodemailer from "nodemailer";
import { z } from "zod";
import { headers } from "next/headers";
import { siteConfig } from "@/lib/config";

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

export type ContactGeneralActionResult =
    | { success: true }
    | { success: false; error: string };

const rateLimit = new Map<string, number>();

function escapeHtml(input: string) {
    return input
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

async function getClientKey() {
    const h = await headers();

    const xff = h.get("x-forwarded-for");
    const ip = xff ? xff.split(",")[0]?.trim() : h.get("x-real-ip") || "unknown";
    const ua = h.get("user-agent") || "unknown";

    return `${ip}:${ua}`;
}

export async function sendGeneralInquiry(
    _prevState: ContactGeneralActionResult | null,
    formData: FormData
): Promise<ContactGeneralActionResult> {
    try {
        // Rate limit: 1 request / 15s per client key
        const key = await getClientKey();
        const now = Date.now();
        const last = rateLimit.get(key) || 0;

        if (now - last < 15_000) {
            return { success: false, error: "Too many requests. Please wait a moment." };
        }
        rateLimit.set(key, now);

        // Optional cleanup to avoid unbounded growth
        if (rateLimit.size > 5000) {
            const cutoff = now - 60 * 60 * 1000;
            for (const [k, ts] of rateLimit) {
                if (ts < cutoff) rateLimit.delete(k);
            }
        }

        // Read + normalize from FormData
        const raw = {
            name: String(formData.get("name") ?? ""),
            email: String(formData.get("email") ?? ""),
            phone: String(formData.get("phone") ?? ""),
            subject: String(formData.get("subject") ?? ""),
            message: String(formData.get("message") ?? ""),
            honeypot: String(formData.get("honeypot") ?? ""),
            noMedicalInfoAck:
                formData.get("noMedicalInfoAck") === "on" ||
                formData.get("noMedicalInfoAck") === "true",
        };

        // Honeypot: pretend success
        if (raw.honeypot) return { success: true };

        const parsed = schema.safeParse({
            ...raw,
            noMedicalInfoAck: raw.noMedicalInfoAck === true ? true : (false as any),
        });

        if (!parsed.success) {
            return { success: false, error: "Invalid form data." };
        }

        const data = parsed.data;

        // Escape HTML (prevents injection in your email template)
        const safeName = escapeHtml(data.name);
        const safeEmail = escapeHtml(data.email);
        const safePhone = escapeHtml(data.phone);
        const safeSubject = escapeHtml(data.subject);
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
        if (!process.env.SMTP_USER || !process.env.SMTP_PASS || !to) {
            return { success: false, error: "Server not configured." };
        }

        await transporter.sendMail({
            from: `Website General Inquiry <${process.env.SMTP_USER}>`,
            to,
            replyTo: data.email,
            subject: `Website Inquiry — ${data.subject}`,
            text: [
                "New website general inquiry (users are instructed not to submit medical info).",
                "",
                `Name: ${data.name}`,
                `Email: ${data.email}`,
                `Phone: ${data.phone}`,
                `Subject: ${data.subject}`,
                "",
                "Message:",
                data.message,
                "",
                `Sent from: ${siteConfig.name}`,
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
          Submitted via the <b>general inquiries</b> form (no medical details requested).
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

        return { success: true };
    } catch {
        // No logging of user-provided content
        return { success: false, error: "Server error." };
    }
}
