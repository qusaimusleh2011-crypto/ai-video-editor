import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

// Mock subtitles generation (in production, use AssemblyAI or Whisper)
function generateMockSubtitles(): string {
  return `WEBVTT

00:00:00.000 --> 00:00:03.000
Welcome to ClipSpark

00:00:03.000 --> 00:00:06.000
Your AI-powered video editing tool

00:00:06.000 --> 00:00:09.000
Edit videos in seconds

00:00:09.000 --> 00:00:12.000
Auto-cuts, captions, and more`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { filePath } = body;

    if (!filePath) {
      return NextResponse.json({ error: "No file path provided" }, { status: 400 });
    }

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    const filename = filePath.split("/").pop();
    const vttFilename = filename?.replace(/\.[^.]+$/, ".vtt") || "subtitles.vtt";
    const vttPath = path.join(uploadsDir, vttFilename);

    // Generate mock subtitles (in production: call AssemblyAI or Whisper API)
    const subtitles = generateMockSubtitles();
    await writeFile(vttPath, subtitles);

    return NextResponse.json({
      success: true,
      vttPath: `/uploads/${vttFilename}`,
      message: "Subtitles generated (mock data)",
    });
  } catch (error) {
    console.error("Subtitles error:", error);
    return NextResponse.json({ error: "Subtitle generation failed" }, { status: 500 });
  }
}
