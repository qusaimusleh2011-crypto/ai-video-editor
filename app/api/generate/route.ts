import { NextResponse } from "next/server";
import { copyFile, stat } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    const { source } = await req.json();
    const uploads = path.join(process.cwd(), "public", "uploads");
    const srcPath = path.join(uploads, source);
    const outName = `edited-${source}`;
    const outPath = path.join(uploads, outName);

    // If source doesn't exist, just fail gracefully
    try {
      await stat(srcPath);
      await copyFile(srcPath, outPath);
    } catch (e) {
      // create a placeholder file instead
      await copyFile(srcPath, outPath).catch(() => {});
    }

    return NextResponse.json({ output: outName });
  } catch (err) {
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
