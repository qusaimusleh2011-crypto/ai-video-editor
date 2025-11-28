import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const start = url.searchParams.get("start");
    const duration = Number(url.searchParams.get("duration") || 30);

    if (!start) return NextResponse.json({ error: "missing start" }, { status: 400 });

    const startTime = new Date(start).getTime();
    const now = Date.now();
    const elapsed = Math.max(0, (now - startTime) / 1000);
    const percent = Math.min(100, Math.round((elapsed / duration) * 100));

    let tip = null;
    if (percent > 10 && percent < 40) tip = "Detecting key moments for highlights";
    if (percent >= 40 && percent < 80) tip = "Applying color grading and music overlay";
    if (percent >= 80 && percent < 100) tip = "Finalizing export and thumbnail generation";

    return NextResponse.json({ percent, tip });
  } catch (err) {
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
