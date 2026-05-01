"use client";

import { useRef, useState } from "react";

interface ResponseFormProps {
  weekNumber: number;
  question: string;
  existingTextResponse?: string | null;
  existingVideoUrl?: string | null;
}

type Mode = "idle" | "text" | "video";
type RecordState = "idle" | "recording" | "recorded";

export default function ResponseForm({
  weekNumber,
  question,
  existingTextResponse,
  existingVideoUrl,
}: ResponseFormProps) {
  const [mode, setMode] = useState<Mode>("idle");
  const [textValue, setTextValue] = useState(existingTextResponse ?? "");
  const [recordState, setRecordState] = useState<RecordState>("idle");
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(existingVideoUrl ?? null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const liveVideoRef = useRef<HTMLVideoElement | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  async function startRecording() {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (liveVideoRef.current) {
        liveVideoRef.current.srcObject = stream;
        liveVideoRef.current.play();
      }
      chunksRef.current = [];
      const recorder = new MediaRecorder(stream);
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "video/webm" });
        setVideoBlob(blob);
        const url = URL.createObjectURL(blob);
        setPreviewUrl(url);
        setRecordState("recorded");
        stream.getTracks().forEach((t) => t.stop());
      };
      mediaRecorderRef.current = recorder;
      recorder.start();
      setRecordState("recording");
    } catch {
      setError("Camera access was denied. Please allow camera access and try again.");
    }
  }

  function stopRecording() {
    mediaRecorderRef.current?.stop();
  }

  async function handleSubmit() {
    setSubmitting(true);
    setError(null);
    try {
      let videoUrl: string | null = existingVideoUrl ?? null;

      if (videoBlob) {
        const formData = new FormData();
        formData.append("file", videoBlob, `week-${weekNumber}.webm`);
        formData.append("weekNumber", String(weekNumber));
        const uploadRes = await fetch("/api/upload-video", {
          method: "POST",
          body: formData,
        });
        if (!uploadRes.ok) throw new Error("Video upload failed");
        const { url } = await uploadRes.json();
        videoUrl = url;
      }

      const res = await fetch("/api/responses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          weekNumber,
          textResponse: mode === "text" ? textValue : null,
          videoUrl: mode === "video" ? videoUrl : null,
        }),
      });

      if (!res.ok) throw new Error("Failed to save response");
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="text-center space-y-3">
        <div className="text-5xl">💌</div>
        <p className="text-white text-xl font-semibold">Saved forever.</p>
        <p className="text-white/70 text-sm">Your little one will treasure this someday.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <div className="bg-white/10 backdrop-blur-sm rounded-3xl px-6 py-5 border border-white/20">
        <p className="text-white text-base font-semibold text-center leading-snug">
          {question}
        </p>
      </div>

      {mode === "idle" && (
        <div className="flex gap-3">
          <button
            onClick={() => setMode("text")}
            className="flex-1 bg-white/20 hover:bg-white/30 border border-white/30 text-white font-semibold py-4 rounded-2xl transition-all active:scale-95"
          >
            ✍️ Write a message
          </button>
          <button
            onClick={() => setMode("video")}
            className="flex-1 bg-white/20 hover:bg-white/30 border border-white/30 text-white font-semibold py-4 rounded-2xl transition-all active:scale-95"
          >
            🎥 Record a video
          </button>
        </div>
      )}

      {mode === "text" && (
        <div className="space-y-3">
          <textarea
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            placeholder="Write your thoughts here..."
            rows={5}
            className="w-full bg-white/10 border border-white/30 text-white placeholder-white/50 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-white/50 resize-none"
          />
          <div className="flex gap-2">
            <button
              onClick={() => setMode("idle")}
              className="flex-1 bg-white/10 border border-white/30 text-white/70 font-semibold py-3 rounded-2xl transition-all"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={!textValue.trim() || submitting}
              className="flex-1 bg-white text-purple-700 font-bold py-3 rounded-2xl transition-all active:scale-95 disabled:opacity-50"
            >
              {submitting ? "Saving..." : "Save ❤️"}
            </button>
          </div>
        </div>
      )}

      {mode === "video" && (
        <div className="space-y-3">
          {recordState === "idle" && (
            <button
              onClick={startRecording}
              className="w-full bg-red-400/80 hover:bg-red-400 border border-white/30 text-white font-bold py-4 rounded-2xl transition-all active:scale-95"
            >
              ● Start Recording
            </button>
          )}

          {recordState === "recording" && (
            <div className="space-y-3">
              <div className="rounded-2xl overflow-hidden bg-black aspect-video">
                <video ref={liveVideoRef} muted className="w-full h-full object-cover" />
              </div>
              <button
                onClick={stopRecording}
                className="w-full bg-white/20 border-2 border-red-400 text-white font-bold py-4 rounded-2xl transition-all active:scale-95 animate-pulse"
              >
                ⏹ Stop Recording
              </button>
            </div>
          )}

          {recordState === "recorded" && previewUrl && (
            <div className="space-y-3">
              <div className="rounded-2xl overflow-hidden bg-black aspect-video">
                <video ref={videoRef} src={previewUrl} controls className="w-full h-full object-cover" />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setRecordState("idle");
                    setVideoBlob(null);
                    setPreviewUrl(existingVideoUrl ?? null);
                  }}
                  className="flex-1 bg-white/10 border border-white/30 text-white/70 font-semibold py-3 rounded-2xl"
                >
                  Re-record
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="flex-1 bg-white text-purple-700 font-bold py-3 rounded-2xl transition-all active:scale-95 disabled:opacity-50"
                >
                  {submitting ? "Saving..." : "Save ❤️"}
                </button>
              </div>
            </div>
          )}

          {recordState === "idle" && (
            <button
              onClick={() => setMode("idle")}
              className="w-full bg-white/10 border border-white/30 text-white/70 font-semibold py-3 rounded-2xl transition-all"
            >
              Back
            </button>
          )}
        </div>
      )}

      {error && (
        <p className="text-red-300 text-sm text-center bg-red-900/30 rounded-xl px-4 py-2">
          {error}
        </p>
      )}
    </div>
  );
}
