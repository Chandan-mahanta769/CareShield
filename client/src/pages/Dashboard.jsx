import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

import Header from "../components/Header";
import CandidateGrid from "../components/CandidateGrid";
import RightPanel from "../components/RightPanel";
import ActivityLog from "../components/ActivityLog";

import socket from "../socket";
import API from "../api";

import AIMonitor from "../components/AIMonitor";

export default function Dashboard() {

  const [candidates, setCandidates] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [filter, setFilter] = useState("ALL");

  const rootRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [candidateRes, alertRes] = await Promise.all([
          API.get("/candidates"),
          API.get("/alerts")
        ]);

        setCandidates(candidateRes.data);
        setAlerts(alertRes.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const animationPlayed = useRef(false);

  useLayoutEffect(() => {
    if (animationPlayed.current) return;
    if (!rootRef.current) return;
    if (candidates.length === 0 && alerts.length === 0) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

      const headerEl = rootRef.current.querySelector(".dashboard-header");
      if (headerEl) {
        timeline.from(headerEl, {
          opacity: 0,
          y: -24,
          duration: 0.7
        });
      }

      timeline.from(
        ".candidate-card",
        {
          opacity: 0,
          y: 30,
          stagger: 0.08,
          duration: 0.45
        },
        "-=0.45"
      );

      timeline.from(
        ".panel-item",
        {
          opacity: 0,
          x: 30,
          stagger: 0.08,
          duration: 0.45
        },
        "-=0.4"
      );
    }, rootRef);

    animationPlayed.current = true;
    return () => ctx.revert();
  }, [alerts.length, candidates.length]);

  const filteredCandidates = candidates.filter((candidate) => {
    if (filter === "ALL") return true;
    if (filter === "FLAGGED") return candidate.status === "FLAGGED";
    if (filter === "SAFE") return candidate.status === "OK";
    return true;
  });

  useEffect(() => {
    const handleAlert = (alert) => {
      setAlerts((prev) => {
        const exists = prev.some((a) => a._id === alert._id);
        if (exists) return prev;
        return [alert, ...prev].slice(0, 30);
      });
    };

    const handleCandidate = (updatedCandidate) => {
      setCandidates((prev) => {
        const exists = prev.find(
          (c) => c.candidateId === updatedCandidate.candidateId
        );

        if (!exists) {
          return [updatedCandidate, ...prev];
        }

        return prev.map((c) =>
          c.candidateId === updatedCandidate.candidateId
            ? updatedCandidate
            : c
        );
      });
    };

    socket.on("new-alert", handleAlert);
    socket.on("candidate-update", handleCandidate);

    return () => {
      socket.off("new-alert", handleAlert);
      socket.off("candidate-update", handleCandidate);
    };
  }, []);

  return (
    <div ref={rootRef} className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] overflow-hidden">

      <Header
        candidates={candidates}
        selectedFilter={filter}
        onFilterChange={setFilter}
        mode={candidates.length > 0 ? "Live Mode" : "Demo Mode"}
      />

      <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] h-[calc(100vh-120px)]">

        {/* LEFT */}
        <div className="border-r border-[var(--border-color)] flex flex-col overflow-hidden">

          {/* GRID */}
          <div className="flex-1 overflow-y-auto p-3 xl:p-5">
            <CandidateGrid candidates={filteredCandidates} />
          </div>

          {/* ACTIVITY */}
          <div className="h-[220px] border-t border-[var(--border-color)]">
            <ActivityLog alerts={alerts} />
          </div>

        </div>

        {/* RIGHT */}
        <div className="bg-[var(--bg-secondary)] overflow-y-auto p-5 space-y-5">
          <AIMonitor candidates={candidates} />
          <RightPanel alerts={alerts} candidates={candidates} />
        </div>

      </div>
    </div>
  );
}
