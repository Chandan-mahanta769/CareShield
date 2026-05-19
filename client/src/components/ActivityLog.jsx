export default function ActivityLog({ alerts = [] }) {
  const formatTime = (alert) => {
    if (!alert.createdAt) return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    return new Date(alert.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="h-full overflow-y-auto p-5 bg-[var(--bg-primary)]">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg tracking-[4px] text-[var(--text-muted)]">ACTIVITY LOG</h2>
          <p className="text-xs text-[var(--text-muted)]">Latest detection events from the camera feed.</p>
        </div>
        <button className="border border-[var(--danger)] text-[var(--danger)] text-xs px-3 py-1 rounded-sm">
          Recent Events
        </button>
      </div>

      <div className="space-y-4">
        {alerts.map((alert, index) => (
          <div
            key={index}
            className="flex items-start gap-4 border-b border-[var(--border-color)] pb-3"
          >
            <div className="text-xs text-[var(--text-muted)] mt-1">
              {formatTime(alert)}
            </div>
            <div>
              <p className="text-sm">
                <span className="text-[var(--danger)] font-semibold">ALERT</span>{" "}
                {alert.type} — {alert.candidateId} {alert.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
