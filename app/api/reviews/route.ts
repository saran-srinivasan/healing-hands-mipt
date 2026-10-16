import { NextResponse } from "next/server";
import { z } from "zod";

const reviewSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name too long"),
  rating: z.number().int().min(1).max(5),
  review: z.string().trim().min(1, "Review is required").max(2000, "Review too long"),
});

const rateLimit = new Map<string, number>();

function getClientIp(req: Request) {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]?.trim() || "unknown";
  return req.headers.get("x-real-ip") || "unknown";
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const ua = request.headers.get("user-agent") || "unknown";
    const key = `${ip}:${ua}`;

    // Basic rate limit: 1 review per 15 seconds
    const now = Date.now();
    const last = rateLimit.get(key) || 0;
    if (now - last < 15_000) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment." },
        { status: 429 }
      );
    }
    rateLimit.set(key, now);

    // Clean up rate-limit map
    if (rateLimit.size > 5000) {
      const cutoff = now - 60 * 60 * 1000;
      for (const [k, ts] of rateLimit) {
        if (ts < cutoff) rateLimit.delete(k);
      }
    }

    const rawBody = await request.json().catch(() => null);
    if (!rawBody || typeof rawBody !== "object") {
      return NextResponse.json(
        { error: "Invalid request payload" },
        { status: 400 }
      );
    }

    const parsed = reviewSchema.safeParse(rawBody);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid review data" },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
    if (!webhookUrl) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Forward validated data to Google Apps Script webhook
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      redirect: "follow",
      body: JSON.stringify(parsed.data),
    });

    const responseText = await response.text();

    if (!response.ok) {
      throw new Error(`Webhook returned status ${response.status}`);
    }

    let result;
    try {
      result = JSON.parse(responseText);
    } catch {
      result = { status: "success" };
    }

    if (result.status === "error") {
      throw new Error("Webhook processing failed");
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to submit testimonial" },
      { status: 500 }
    );
  }
}
