"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import ProgressBar from "../../components/ProgressBar";

function ProcessingContent() {
  const params = useSearchParams();
  const router = useRouter();
  const jobId = params.get("jobId") || undefined;
  const start = params.get("start") || undefined;
  const duration = Number(params.get("duration") || 30);
  const file = params.get("file") || "";

  const [percent, setPercent] = useState(0);
  const [tip, setTip] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    async function poll() {
      if (!start) return;
      const resp = await fetch(`/api/status?start=${encodeURIComponent(start)}&duration=${duration}&jobId=${jobId}`);
      const data = await resp.json();
      if (!mounted) return;
      setPercent(data.percent);
      setTip(data.tip || null);
        if (data.percent >= 100) {
          // generate the edited file on the server (simulated)
          try {
            const genResp = await fetch("/api/generate", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ source: file }),
            });
            const genData = await genResp.json();
            const editedName = genData.output || `edited-${file}`;
            router.push(`/output?file=${encodeURIComponent(file)}&edited=${encodeURIComponent(editedName)}`);
            return;
          } catch (e) {
            router.push(`/output?file=${encodeURIComponent(file)}&edited=${encodeURIComponent("edited-" + file)}`);
            return;
          }
        } else {
        setTimeout(poll, 1000);
      }
    }
    poll();
    return () => {
      mounted = false;
    };
  }, [start, duration, jobId, router, file]);

  return (
    <main className="py-12">
      <h1 className="text-3xl font-bold">Processing Your Video</h1>
      <p className="mt-2 text-sm opacity-80">AI is editing your video. This may take a few moments.</p>

      <div className="mt-6 max-w-xl">
        <ProgressBar percent={percent} />
        <div className="mt-4">{percent}%</div>
        {tip && <div className="mt-3 p-3 bg-gray-50 rounded">Tip: {tip}</div>}
      </div>
    </main>
  );
}

export default function ProcessingPage() {
  return (
    <Suspense fallback={<div className="py-12"><p>Loading...</p></div>}>
      <ProcessingContent />
    </Suspense>
  );
}
