import { siteConfig } from "@/lib/config";
import nodemailer from "nodemailer";
import { z } from "zod";

const schema = z.object({
    name: z.string().min(2).max(100),
    email: z.string().email(),
    phone: z.string().min(10).max(20),
    message: z.string().min(10).max(1000),
    honeypot: z.string().max(0),
});

const rateLimit = new Map();

export async function POST(req: Request) {
    try {
        const ip =
            req.headers.get("x-forwarded-for") ||
            req.headers.get("x-real-ip") ||
            "unknown";

        const now = Date.now();
        const last = rateLimit.get(ip) || 0;

        if (now - last < 15000) {
            return Response.json(
                { error: "Too many requests" },
                { status: 429 }
            );
        }

        rateLimit.set(ip, now);

        const body = await req.json();
        const data = schema.parse(body);

        if (data.honeypot) {
            return Response.json({ ok: true });
        }

        const transporter = nodemailer.createTransport({
            host: "smtppro.zoho.in",
            port: 465,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        await transporter.sendMail({
            from: `Website Contact <${process.env.SMTP_USER}>`,
            to: process.env.CONTACT_RECEIVER,
            replyTo: data.email,
            subject: `New Contact — ${data.name}`,
            html: `
  <div style="background:#f4f7fb;padding:40px 0;font-family:Arial,sans-serif">
    <table align="center" width="100%" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 5px 20px rgba(0,0,0,0.08)">
      
      <!-- Header -->
      <tr>
        <td style="background:#2563eb;color:#ffffff;padding:24px;text-align:center;font-size:22px;font-weight:bold">
          New Website Inquiry
        </td>
      </tr>

      <!-- Content -->
      <tr>
        <td style="padding:30px">
          
          <p style="font-size:16px;margin-bottom:20px">
            You received a new message from your website contact form.
          </p>

          <table width="100%" style="border-collapse:collapse">
            
            <tr>
              <td style="padding:10px 0;color:#6b7280;font-size:14px">Name</td>
              <td style="padding:10px 0;font-weight:bold">${data.name}</td>
            </tr>

            <tr>
              <td style="padding:10px 0;color:#6b7280;font-size:14px">Email</td>
              <td style="padding:10px 0;font-weight:bold">${data.email}</td>
            </tr>

            <tr>
              <td style="padding:10px 0;color:#6b7280;font-size:14px">Phone</td>
              <td style="padding:10px 0;font-weight:bold">${data.phone}</td>
            </tr>

          </table>

          <hr style="border:none;border-top:1px solid #e5e7eb;margin:25px 0"/>

          <p style="font-size:14px;color:#6b7280;margin-bottom:8px">
            Message
          </p>

          <div style="background:#f9fafb;border-radius:8px;padding:15px;font-size:15px;line-height:1.6">
            ${data.message.replace(/\n/g, "<br>")}
          </div>

          <div style="text-align:center;margin-top:30px">
            <a href="mailto:${data.email}"
               style="background:#2563eb;color:#fff;text-decoration:none;padding:12px 22px;border-radius:8px;font-weight:bold;display:inline-block">
               Reply to ${data.name}
            </a>
          </div>

        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background:#f9fafb;padding:18px;text-align:center;font-size:12px;color:#9ca3af">
          This email was sent from ${siteConfig.name} website contact form.<br/>
          © ${new Date().getFullYear()} ${siteConfig.name}
        </td>
      </tr>

    </table>
  </div>
  `,
        });

        return Response.json({ success: true });

    } catch (err) {
        console.error(err);
        return Response.json(
            { error: "Server error" },
            { status: 500 }
        );
    }
}
