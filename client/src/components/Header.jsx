import { useEffect, useState } from "react";

export default function Header({
  candidates,
  selectedFilter,
  onFilterChange,
  mode
}) {

  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const flagged = candidates.filter(
    (c) => c.status === "FLAGGED"
  ).length;

  const safe = candidates.filter(
    (c) => c.status === "OK"
  ).length;

  return (
    <header className="dashboard-header border-b border-[var(--border-color)] bg-[var(--bg-secondary)]">

      {/* TOP */}
      <div className="h-[72px] px-6 flex items-center justify-between">

        {/* LEFT */}
        <div className="flex items-center gap-4">

          <div className="space-y-1">
            <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#F6AE2D] via-[#F8C95F] to-[#FBE08A] tracking-[6px] font-bold text-5xl drop-shadow-[0_0_18px_rgba(246,174,45,0.35)]">
              CareShield
            </h1>
            <p className="text-[var(--text-muted)] uppercase tracking-[3px] text-xs">
              CareShield Intelligence
            </p>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)] bg-black/20 px-3 py-1 text-[var(--accent)] text-xs">
            <div className="h-2 w-2 rounded-full bg-[var(--accent)] animate-pulse" />
            {mode}
          </div>

        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-10">

          <div className="w-20 text-center">
            <div className="text-[var(--accent)] font-bold text-2xl">
              {candidates.length}
            </div>
            <div className="text-xs tracking-widest text-[var(--text-muted)]">
              MONITORED
            </div>
          </div>

          <div className="w-20 text-center">
            <div className="text-[var(--danger)] font-bold text-2xl">
              {flagged}
            </div>
            <div className="text-xs tracking-widest text-[var(--text-muted)]">
              FLAGGED
            </div>
          </div>

          <div className="w-20 text-center">
            <div className="text-[var(--safe)] font-bold text-2xl">
              {safe}
            </div>
            <div className="text-xs tracking-widest text-[var(--text-muted)]">
              SAFE
            </div>
          </div>

          {/* TIMER */}
          <div className="border border-[var(--border-color)] px-4 py-2 text-sm tracking-[2px] text-[var(--text-muted)]">
            {currentTime}
          </div>

        </div>

      </div>

      {/* FILTERS */}
      <div className="h-[48px] px-6 flex items-center gap-4 border-t border-[var(--border-color)]">

        <button
          className={`text-sm tracking-[2px] px-4 py-2 rounded-sm transition ${
            selectedFilter === "ALL"
              ? "text-[var(--accent)] border-b border-[var(--accent)] pb-2"
              : "text-[var(--text-muted)] hover:text-white"
          }`}
          onClick={() => onFilterChange("ALL")}
        >
          ALL ({candidates.length})
        </button>

        <button
          className={`text-sm tracking-[2px] px-4 py-2 rounded-sm transition ${
            selectedFilter === "FLAGGED"
              ? "text-[var(--accent)] border-b border-[var(--accent)] pb-2"
              : "text-[var(--text-muted)] hover:text-white"
          }`}
          onClick={() => onFilterChange("FLAGGED")}
        >
          FLAGGED ({flagged})
        </button>

        <button
          className={`text-sm tracking-[2px] px-4 py-2 rounded-sm transition ${
            selectedFilter === "SAFE"
              ? "text-[var(--accent)] border-b border-[var(--accent)] pb-2"
              : "text-[var(--text-muted)] hover:text-white"
          }`}
          onClick={() => onFilterChange("SAFE")}
        >
          SAFE ({safe})
        </button>

      </div>

    </header>
  );
}