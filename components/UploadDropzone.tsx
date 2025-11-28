"use client";
import { useRef, useState } from "react";

export default function UploadDropzone({ onFile }: { onFile: (f: File) => void }) {
  const ref = useRef<HTMLInputElement | null>(null);
  const [dragging, setDragging] = useState(false);
  const [filename, setFilename] = useState("");

  function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    const file = files[0];
    setFilename(file.name);
    onFile(file);
  }

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={`border-2 border-dashed rounded-xl p-8 text-center transition ${
          dragging ? "border-blue-500 bg-blue-500 bg-opacity-10" : "border-gray-700 bg-gray-900"
        }`}
      >
        <div className="text-4xl mb-4">📹</div>
        <p className="mb-4 text-gray-300">Drag & drop your video here, or</p>
        <button
          type="button"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition"
          onClick={() => ref.current?.click()}
        >
          Choose a file
        </button>
        <p className="mt-4 text-sm text-gray-500">MP4, MOV, or AVI • Max 300MB</p>
        <input
          ref={ref}
          type="file"
          accept="video/mp4,video/quicktime,video/x-msvideo"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>
      {filename && (
        <p className="mt-4 text-sm text-green-400">✓ Selected: {filename}</p>
      )}
    </div>
  );
}
