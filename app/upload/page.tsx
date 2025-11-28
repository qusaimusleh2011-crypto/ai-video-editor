"use client";
import { useState } from "react";
import UploadDropzone from "../../components/UploadDropzone";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [style, setStyle] = useState("cinematic");
  const [prompt, setPrompt] = useState("");
  const router = useRouter();

  async function startProcessing() {
    if (!file) return alert("Please choose a video file first.");

    // First upload file to existing upload API
    const formData = new FormData();
    formData.append("video", file);

    const uploadResp = await fetch("/api/upload", { method: "POST", body: formData });
    const uploadData = await uploadResp.json();
    if (!uploadResp.ok) return alert("Upload failed: " + (uploadData?.error ?? ""));

    // Start simulated processing job
    const processResp = await fetch("/api/process", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileName: uploadData.savedAs, title, style, prompt }),
    });
    const job = await processResp.json();
    router.push(`/processing?jobId=${job.jobId}&start=${encodeURIComponent(job.start)}&duration=${job.duration}&file=${encodeURIComponent(uploadData.savedAs)}`);
  }

  return (
    <main className="py-12">
      <h1 className="text-3xl font-bold">Upload Video</h1>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <UploadDropzone onFile={(f) => setFile(f)} />
          {file && <p className="mt-4">Selected: {file.name} ({Math.round(file.size / 1024 / 1024)} MB)</p>}
        </div>
        <div>
          <label className="block">Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border rounded px-3 py-2 mt-1" />

          <label className="block mt-4">Style</label>
          <select value={style} onChange={(e) => setStyle(e.target.value)} className="w-full border rounded px-3 py-2 mt-1">
            <option value="cinematic">Cinematic</option>
            <option value="vlog">Vlog</option>
            <option value="tiktok">TikTok</option>
            <option value="youtube">YouTube</option>
            <option value="gaming">Gaming Highlights</option>
          </select>

          <label className="block mt-4">Optional prompt</label>
          <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} className="w-full border rounded px-3 py-2 mt-1" />

          <div className="mt-6">
            <button onClick={startProcessing} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
              Process Video with AI
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
