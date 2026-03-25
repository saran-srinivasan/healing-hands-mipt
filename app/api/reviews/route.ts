import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error("Missing GOOGLE_SHEET_WEBHOOK_URL");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Forward the data to the Google Apps Script webhook
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain", 
      },
      redirect: "follow",
      body: JSON.stringify(body),
    });

    const responseText = await response.text();

    if (!response.ok) {
      throw new Error(`Google Apps Script returned status ${response.status}: ${responseText}`);
    }

    let result;
    try {
      result = JSON.parse(responseText);
    } catch {
      // If response is not JSON, treat it as success if status was ok
      result = { status: "success" };
    }
    
    if (result.status === "error") {
      throw new Error(result.message);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Testimonial submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit testimonial" },
      { status: 500 }
    );
  }
}
