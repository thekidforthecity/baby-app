"use client";

import { useEffect, useRef, useState } from "react";

interface ResponseFormProps {
  weekNumber: number;
  question: string;
  babyReply: string;
  existingTextResponse?: string | null;
  existingVideoUrl?: string | null;
}

type Mode = "idle" | "text" | "video";
type RecordState = "idle" | "recording" | "recorded";

const MAX_SECONDS = 90;

function getBestMimeType(): string {
  const types = [
    "video/webm;codecs=vp9,opus",
    "video/webm;codecs=vp8,opus",
    "video/webm",
    "video/mp4",
  ];
  return types.find((t) => MediaRecorder.isTypeSupported(t)) ?? "";
}

export default function ResponseForm({
  weekNumber,
  question,
  babyReply,
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
  const [secondsLeft, setSecondsLeft] = useState(MAX_SECONDS);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const liveVideoRef = useRef<HTMLVideoElement | null>(null);
  const playbackVideoRef = useRef<HTMLVideoElement | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Clean up stream and timer when component unmounts
  useEffect(() => {
    return () => {
      stopStream();
      clearTimer();
    };
  }, []);

  function stopStream() {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }

  function clearTimer() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }

  function startCountdown() {
    setSecondsLeft(MAX_SECONDS);
    timerRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          // Auto-stop when time runs out
          mediaRecorderRef.current?.stop();
          clearTimer();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  async function startRecording() {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: true,
      });

      streamRef.current = stream;

      if (liveVideoRef.current) {
        liveVideoRef.current.srcObject = stream;
        await liveVideoRef.current.play().catch(() => {});
      }

      chunksRef.current = [];
      const mimeType = getBestMimeType();
      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const finalMime = mimeType || "video/webm";
        const blob = new Blob(chunksRef.current, { type: finalMime });
        setVideoBlob(blob);
        const url = URL.createObjectURL(blob);
        setPreviewUrl(url);
        setRecordState("recorded");
        stopStream();
        clearTimer();
      };

      mediaRecorderRef.current = recorder;
      // timeslice of 1000ms ensures data is flushed regularly — important for long recordings
      recorder.start(1000);
      setRecordState("recording");
      startCountdown();
    } catch {
      setError("Camera access was denied. Please allow camera access in your browser settings and try again.");
    }
  }

  function stopRecording() {
    clearTimer();
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
  }

  function handleBack() {
    stopRecording();
    stopStream();
    clearTimer();
    setRecordState("idle");
    setVideoBlob(null);
    setPreviewUrl(existingVideoUrl ?? null);
    setSecondsLeft(MAX_SECONDS);
    setMode("idle");
  }

  async function handleSubmit() {
    setSubmitting(true);
    setError(null);
    try {
      let videoUrl: string | null = existingVideoUrl ?? null;

      if (videoBlob) {
        const ext = videoBlob.type.includes("mp4") ? "mp4" : "webm";
        const formData = new FormData();
        formData.append("file", videoBlob, `week-${weekNumber}.${ext}`);
        formData.append("weekNumber", String(weekNumber));

        const uploadRes = await fetch("/api/upload-video", {
          method: "POST",
          body: formData,
        });

        if (!uploadRes.ok) {
          const body = await uploadRes.json().catch(() => ({}));
          throw new Error(body.error ?? "Video upload failed");
        }

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

  const progressPct = ((MAX_SECONDS - secondsLeft) / MAX_SECONDS) * 100;
  const timerColor = secondsLeft <= 10 ? "text-red-500" : "text-white";

  if (submitted) {
    return (
      <div className="w-full max-w-md mx-auto text-center space-y-5">
        <div className="text-6xl animate-bounce">💌</div>
        <p className="text-purple-800 text-xl font-bold">Saved forever.</p>
        <div className="bg-white/60 backdrop-blur-sm border border-purple-200 rounded-3xl px-6 py-5">
          <p className="text-purple-500 text-xs font-semibold uppercase tracking-widest mb-3">
            A message from your little one
          </p>
          <p className="text-purple-800 text-base leading-relaxed font-medium">{babyReply}</p>
        </div>
        <p className="text-purple-400 text-xs">Your little one will treasure this someday 🤍</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <div className="bg-white/60 backdrop-blur-sm rounded-3xl px-6 py-5 border border-purple-200">
        <p className="text-purple-800 text-base font-semibold text-center leading-snug">{question}</p>
      </div>

      {mode === "idle" && (
        <div className="flex gap-3">
          <button
            onClick={() => setMode("text")}
            className="flex-1 bg-white/50 hover:bg-white/70 border border-purple-200 text-purple-800 font-semibold py-4 rounded-2xl transition-all active:scale-95"
          >
            ✍️ Write a message
          </button>
          <button
            onClick={() => setMode("video")}
            className="flex-1 bg-white/50 hover:bg-white/70 border border-purple-200 text-purple-800 font-semibold py-4 rounded-2xl transition-all active:scale-95"
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
            className="w-full bg-white/60 border border-purple-200 text-purple-800 placeholder-purple-300 rounded-2xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-purple-300 resize-none"
          />
          <div className="flex gap-2">
            <button
              onClick={() => setMode("idle")}
              className="flex-1 bg-white/40 border border-purple-200 text-purple-600 font-semibold py-3 rounded-2xl transition-all"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={!textValue.trim() || submitting}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-2xl transition-all active:scale-95 disabled:opacity-50"
            >
              {submitting ? "Saving..." : "Save ❤️"}
            </button>
          </div>
        </div>
      )}

      {mode === "video" && (
        <div className="space-y-3">
          {recordState === "idle" && (
            <>
              <p className="text-purple-600 text-sm text-center">
                Up to {MAX_SECONDS} seconds. Your camera will open when you press record.
              </p>
              <button
                onClick={startRecording}
                className="w-full bg-red-400/80 hover:bg-red-400 border border-red-300 text-white font-bold py-4 rounded-2xl transition-all active:scale-95"
              >
                ● Start Recording
              </button>
              <button
                onClick={handleBack}
                className="w-full bg-white/40 border border-purple-200 text-purple-600 font-semibold py-3 rounded-2xl transition-all"
              >
                Back
              </button>
            </>
          )}

          {recordState === "recording" && (
            <div className="space-y-3">
              {/* Live preview — mirrored like a selfie camera */}
              <div className="rounded-2xl overflow-hidden bg-black aspect-video relative">
                <video
                  ref={liveVideoRef}
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                  style={{ transform: "scaleX(-1)" }}
                />
                {/* Timer overlay */}
                <div className="absolute top-3 right-3 bg-black/50 rounded-full px-3 py-1">
                  <span className={`text-sm font-bold tabular-nums ${timerColor}`}>
                    {secondsLeft}s
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-purple-200 rounded-full h-1.5">
                <div
                  className="bg-red-400 h-1.5 rounded-full transition-all duration-1000"
                  style={{ width: `${progressPct}%` }}
                />
              </div>

              <button
                onClick={stopRecording}
                className="w-full bg-white/50 border-2 border-red-400 text-purple-800 font-bold py-4 rounded-2xl transition-all active:scale-95"
              >
                ⏹ Stop Recording
              </button>
            </div>
          )}

          {recordState === "recorded" && previewUrl && (
            <div className="space-y-3">
              <div className="rounded-2xl overflow-hidden bg-black aspect-video">
                <video
                  ref={playbackVideoRef}
                  src={previewUrl}
                  controls
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setRecordState("idle");
                    setVideoBlob(null);
                    setPreviewUrl(existingVideoUrl ?? null);
                    setSecondsLeft(MAX_SECONDS);
                  }}
                  className="flex-1 bg-white/40 border border-purple-200 text-purple-600 font-semibold py-3 rounded-2xl"
                >
                  Re-record
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-2xl transition-all active:scale-95 disabled:opacity-50"
                >
                  {submitting ? "Uploading..." : "Save ❤️"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {error && (
        <p className="text-red-600 text-sm text-center bg-red-100 rounded-xl px-4 py-2">
          {error}
        </p>
      )}
    </div>
  );
}
