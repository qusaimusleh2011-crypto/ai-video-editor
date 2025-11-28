"use client";

import { useState, useRef } from "react";
import UploadDropzone from "../components/UploadDropzone";
import ProgressBar from "../components/ProgressBar";
import StatusDisplay from "../components/StatusDisplay";

export default function Home() {
  const [uploaded, setUploaded] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoPath, setVideoPath] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [editedVideoPath, setEditedVideoPath] = useState("");
  const [subtitlesPath, setSubtitlesPath] = useState("");

  async function handleUpload(file: File) {
    setStatus("Uploading...");
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("video", file);

    try {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/api/upload");

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const percent = Math.round((e.loaded / e.total) * 100);
          setUploadProgress(percent);
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          if (data.success) {
            setVideoPath(data.filePath);
            setUploaded(true);
            setStatus(null);
            setUploadProgress(0);
          } else {
            setStatus("Upload failed");
          }
        } else {
          setStatus("Upload error");
        }
      };

      xhr.onerror = () => {
        setStatus("Network error");
      };

      xhr.send(formData);
    } catch (err) {
      setStatus("Error uploading file");
    }
  }

  async function handleAutoEdit() {
    setStatus("Processing video...");
    try {
      const res = await fetch("/api/auto-edit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filePath: videoPath }),
      });
      const data = await res.json();
      if (data.success) {
        setEditedVideoPath(data.editedPath);
        setStatus("Video edited successfully!");
      } else {
        setStatus("Auto-edit failed");
      }
    } catch (err) {
      setStatus("Error processing video");
    }
  }

  async function handleSubtitles() {
    setStatus("Generating subtitles...");
    try {
      const res = await fetch("/api/subtitles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filePath: videoPath }),
      });
      const data = await res.json();
      if (data.success) {
        setSubtitlesPath(data.vttPath);
        setStatus("Subtitles generated!");
      } else {
        setStatus("Subtitle generation failed");
      }
    } catch (err) {
      setStatus("Error generating subtitles");
    }
  }

  async function handleTikTokExport() {
    setStatus("Exporting for TikTok...");
    try {
      const res = await fetch("/api/auto-edit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filePath: videoPath, format: "tiktok" }),
      });
      const data = await res.json();
      if (data.success) {
        setEditedVideoPath(data.editedPath);
        setStatus("Exported for TikTok!");
      } else {
        setStatus("Export failed");
      }
    } catch (err) {
      setStatus("Error exporting");
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      {!uploaded && (
        <section className="text-center py-20">
          <h1 className="text-6xl font-bold mb-4">ClipSpark</h1>
          <p className="text-xl text-gray-300 mb-8">Edit videos in seconds — auto-cuts, captions, and social-ready formats.</p>
        </section>
      )}

      {/* Upload Section */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-900 rounded-xl p-8 border border-gray-800">
          <h2 className="text-2xl font-bold mb-6">{uploaded ? "Upload Another Video" : "Upload Your Video"}</h2>

          <UploadDropzone onFile={handleUpload} />

          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="mt-6">
              <ProgressBar percent={uploadProgress} />
              <p className="text-center mt-2 text-sm text-gray-400">{uploadProgress}%</p>
            </div>
          )}

          {status && <StatusDisplay message={status} />}
        </div>
      </div>

      {/* Video Preview & Controls */}
      {uploaded && (
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Video Preview */}
            <div className="lg:col-span-2">
              <h3 className="text-xl font-bold mb-4">Uploaded Video</h3>
              <video
                src={videoPath}
                controls
                className="w-full rounded-xl bg-black border border-gray-800"
              />
              {subtitlesPath && (
                <p className="mt-2 text-sm text-green-400">✓ Subtitles added</p>
              )}
            </div>

            {/* Edit Controls */}
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-bold">Edit Options</h3>

              <button
                onClick={handleAutoEdit}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition"
              >
                Auto Edit (Quick)
              </button>

              <button
                onClick={handleSubtitles}
                className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-xl transition"
              >
                Auto Subtitles
              </button>

              <button
                onClick={handleTikTokExport}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-xl transition"
              >
                Export for TikTok
              </button>
            </div>
          </div>

          {/* Edited Video Preview */}
          {editedVideoPath && (
            <div className="mt-12 bg-gray-900 rounded-xl p-8 border border-gray-800">
              <h3 className="text-xl font-bold mb-4">Edited Video</h3>
              <video
                src={editedVideoPath}
                controls
                className="w-full rounded-xl bg-black border border-gray-800 mb-4"
              />
              <a
                href={editedVideoPath}
                download
                className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-xl transition"
              >
                Download Video
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
