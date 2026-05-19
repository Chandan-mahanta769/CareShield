export default function CandidateCard({
  data,
  index
}) {

  const statusStyles = {

    OK: {
      badge:
        "bg-[var(--safe)] text-black",
      border:
        "border-[var(--border-color)]"
    },

    WATCH: {
      badge:
        "bg-[var(--watch)] text-black",
      border:
        "border-[var(--watch)]"
    },

    FLAGGED: {
      badge:
        "bg-[var(--danger)] text-white",
      border:
        "border-[var(--danger)]"
    }

  };

  const current =
    statusStyles[data.status] ||
    statusStyles.OK;

  return (
    <div
      className={`candidate-card
        bg-[var(--bg-secondary)]
        border
        ${current.border}
        rounded-md
        overflow-hidden
        hover:scale-[1.01]
        transition-all
        duration-300
        shadow-[0_0_20px_rgba(226,75,74,0.08)]
      `}
    >

      {/* CAMERA */}
      <div className="relative h-56 bg-black overflow-hidden">

        {/* SCANLINES */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_bottom,transparent_50%,rgba(255,255,255,0.08)_51%)] bg-[size:100%_4px]" />

        {/* VIGNETTE */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_40%,rgba(0,0,0,0.8))]" />

        {/* CAMERA ID */}
        <div className="absolute top-2 left-2 text-[10px] tracking-[3px] text-[var(--text-muted)] z-20">
          CAM-{String(index + 1).padStart(2, "0")}
        </div>

        {/* TIME */}
        <div className="absolute top-2 right-2 text-[10px] text-[var(--text-muted)] z-20">
          {new Date().toLocaleTimeString()}
        </div>

        {/* STATUS ALERT */}
        {data.status === "FLAGGED" && (
          <div className="absolute top-10 left-2 z-20 bg-[var(--danger)] text-white text-[10px] px-2 py-1 rounded-sm tracking-wide animate-pulse">
            FLAGGED
          </div>
        )}

        {/* LIVE CENTER */}
        <div className="h-full flex items-center justify-center relative z-10">

          <div className="w-28 h-28 rounded-full border border-[var(--border-color)] flex items-center justify-center">

            <div className="text-[var(--text-muted)] text-xs tracking-[5px] animate-pulse">
              LIVE
            </div>

          </div>

        </div>

      </div>

      {/* INFO */}
      <div className="p-4">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="font-semibold text-lg">
              {data.name}
            </h2>

            <p className="text-sm text-[var(--text-muted)]">
              {data.candidateId}
            </p>

          </div>

          <span
            className={`
              ${current.badge}
              text-xs
              px-3
              py-1
              rounded-sm
              font-bold
              tracking-wide
            `}
          >
            {data.status}
          </span>

        </div>

      </div>

    </div>
  );
}