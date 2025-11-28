"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function OutputContent() {
  const params = useSearchParams();
  const edited = params.get("edited") || "edited-sample.mp4";
  const original = params.get("file") || "sample.mp4";

  // remote fallback sample (public domain sample mp4)
  const fallback = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

  return (
    <main className="py-12">
      <h1 className="text-3xl font-bold">Your Edited Video</h1>
      <p className="mt-2 text-sm opacity-80">Preview and download your AI-edited result.</p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <video
            src={`/uploads/${edited}`}
            controls
            className="w-full rounded bg-black h-64 object-cover"
            onError={(e) => {
              const v = e.currentTarget as HTMLVideoElement;
              if (v.src.indexOf("flower.mp4") === -1) v.src = fallback;
            }}
          />
          <div className="mt-4 flex gap-3">
            <a href={`/uploads/${edited}`} download className="bg-blue-600 text-white px-4 py-2 rounded">Download MP4</a>
            <button className="bg-gray-100 px-4 py-2 rounded">Share to YouTube</button>
            <button className="bg-gray-100 px-4 py-2 rounded">Share to TikTok</button>
          </div>
        </div>
        <div>
          <h4 className="font-semibold">Original</h4>
          <video
            src={`/uploads/${original}`}
            controls
            className="w-full rounded bg-black h-48 object-cover"
            onError={(e) => {
              const v = e.currentTarget as HTMLVideoElement;
              if (v.src.indexOf("flower.mp4") === -1) v.src = fallback;
            }}
          />

          <div className="mt-4">
            <h4 className="font-semibold">Options</h4>
            <div className="mt-2 flex gap-2">
              <button className="px-3 py-1 border rounded">480p</button>
              <button className="px-3 py-1 border rounded">720p</button>
              <button className="px-3 py-1 border rounded">1080p</button>
              <button className="px-3 py-1 border rounded">4K (Premium)</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function OutputPage() {
  return (
    <Suspense fallback={<div className="py-12"><p>Loading...</p></div>}>
      <OutputContent />
    </Suspense>
  );
}
