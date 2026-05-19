import { useEffect, useRef, useState } from "react";

import * as faceapi from "face-api.js/dist/face-api.min.js";

import socket from "../socket";

export default function AIMonitor({ candidates = [] }) {
  const videoRef = useRef();
  const [status, setStatus] = useState("Loading camera models...");
  const [currentCandidate, setCurrentCandidate] = useState(null);
  const [permissionDenied, setPermissionDenied] = useState(false);

  const getCandidate = () => {
    if (candidates.length === 0) {
      return {
        candidateId: "C001",
        name: "Arjun Mehta"
      };
    }

    return candidates[Math.floor(Math.random() * candidates.length)];
  };

  const sendAlert = (type, severity) => {
    const candidate = getCandidate();
    setCurrentCandidate(candidate);

    socket.emit("detection-event", {
      candidateId: candidate.candidateId,
      name: candidate.name,
      type,
      severity
    });

    setStatus(`Detected ${type} for ${candidate.name}`);
  };

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
      });
      videoRef.current.srcObject = stream;
      setStatus("Live camera feed active");
    } catch (err) {
      console.log(err);
      setPermissionDenied(true);
      setStatus("Camera permission denied. Allow webcam access to start live monitoring.");
    }
  };

  useEffect(() => {
    const loadModels = async () => {
      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
        await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
        setStatus("Camera models loaded.");
        await startVideo();
      } catch (err) {
        console.log(err);
        setStatus("Failed to load detection models.");
      }
    };

    loadModels();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (!videoRef.current || permissionDenied) return;
      if (videoRef.current.readyState < 2) return;

      const detections = await faceapi.detectAllFaces(
        videoRef.current,
        new faceapi.TinyFaceDetectorOptions()
      );

      if (detections.length === 0) {
        sendAlert("Face Not Visible", "CRIT");
      } else if (detections.length > 1) {
        sendAlert("Multiple Faces", "CRIT");
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [candidates, permissionDenied]);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        sendAlert("Tab Switch", "CRIT");
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [candidates]);

  return (
    <div className="panel-item relative rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.35)] z-20">
      <div className="flex items-center justify-between p-4 border-b border-[var(--border-color)]">
        <div>
          <div className="text-[var(--text-muted)] tracking-[3px] uppercase text-xs">
            Live Camera
          </div>
          <h3 className="text-xl font-semibold">CareShield Intelligence</h3>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)] px-3 py-1 text-[var(--accent)] text-xs uppercase">
          <span className="h-2 w-2 rounded-full bg-[var(--accent)] block" />
          Live
        </div>
      </div>

      <div className="relative h-80 bg-black">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent,rgba(0,0,0,0.45))]" />

        <div className="absolute top-4 left-4 rounded-full bg-black/50 px-3 py-1 text-xs text-[var(--text-muted)]">
          {currentCandidate ? currentCandidate.name : "Waiting for candidate..."}
        </div>

        <div className="absolute top-4 right-4 rounded-full bg-black/50 px-3 py-1 text-xs text-[var(--text-muted)]">
          {permissionDenied ? "Camera disabled" : status}
        </div>
      </div>

      <div className="p-4 border-t border-[var(--border-color)] text-sm text-[var(--text-muted)]">
        Live detection events use the current candidate list and actual camera input where available.
      </div>
    </div>
  );
}
