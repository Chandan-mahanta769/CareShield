import { motion } from "framer-motion";

export default function RightPanel({ alerts = [], candidates = [] }) {
  const totalCandidates = candidates.length;
  const flaggedCount = candidates.filter((c) => c.status === "FLAGGED").length;
  const safeCount = candidates.filter((c) => c.status === "OK").length;
  const watchCount = candidates.filter((c) => c.status === "WATCH").length;
  const averageIntegrity = totalCandidates
    ? Math.round(
        candidates.reduce((sum, c) => sum + (c.integrityScore ?? 100), 0) /
          totalCandidates
      )
    : 100;

  const breakdownItems = Object.entries(
    alerts.reduce((result, alert) => {
      result[alert.type] = (result[alert.type] || 0) + 1;
      return result;
    }, {})
  ).map(([type, value]) => ({
    label: type,
    value,
    color:
      type === "Face Not Visible" ||
      type === "Multiple Faces" ||
      type === "Tab Switch"
        ? "var(--danger)"
        : "var(--watch)"
  }));

  const recentMinutes = Array.from({ length: 8 }, (_, index) => ({
    label: `${8 - index}m`,
    count: 0
  }));

  const now = new Date();
  alerts.forEach((alert) => {
    const diff = Math.floor((now - new Date(alert.createdAt)) / 60000);
    if (diff >= 0 && diff < 8) {
      recentMinutes[7 - diff].count += 1;
    }
  });

  return (
    <div className="p-5 space-y-5">
      <div className="panel-item border border-[var(--border-color)] rounded-md p-5 bg-[var(--bg-primary)]">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-[var(--text-muted)] tracking-[3px] mb-2 uppercase text-xs">
              Exam Info
            </h2>
            <p className="text-sm text-[var(--text-muted)]">
              Live session summary based on the current candidate feed.
            </p>
          </div>
          <div className="text-[var(--accent)] text-sm font-semibold">Realtime</div>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-[var(--text-muted)]">Candidates</span>
            <span>{totalCandidates}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--text-muted)]">Flagged</span>
            <span className="text-[var(--danger)]">{flaggedCount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--text-muted)]">Safe</span>
            <span className="text-[var(--safe)]">{safeCount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--text-muted)]">Under Watch</span>
            <span className="text-[var(--watch)]">{watchCount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--text-muted)]">Average Integrity</span>
            <span className="text-[var(--accent)] font-bold">{averageIntegrity}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--text-muted)]">Mode</span>
            <span className="text-[var(--safe)]">Live</span>
          </div>
        </div>
      </div>

      <div className="panel-item border border-[var(--border-color)] rounded-md bg-[var(--bg-primary)] overflow-hidden">
        <motion.div
          className="flex items-center justify-between p-4 border-b border-[var(--border-color)]"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-[var(--text-muted)] tracking-[3px] uppercase text-xs">
            Alerts
          </h2>
          <div className="border border-[var(--danger)] text-[var(--danger)] text-xs px-2 py-1 rounded-sm">
            {alerts.length} Active
          </div>
        </motion.div>

        <div className="divide-y divide-[var(--border-color)]">
          {alerts.map((alert, index) => (
            <div
              key={index}
              className="p-4 border-l-4 border-[var(--danger)] bg-[rgba(226,75,74,0.03)]"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-[var(--danger)] animate-pulse" />
                <p className="font-medium">{alert.type}</p>
                <span className="text-[10px] border border-[var(--danger)] text-[var(--danger)] px-1 rounded-sm">
                  {alert.severity}
                </span>
              </div>
              <p className="text-sm text-[var(--text-muted)]">
                {alert.candidateId} — {alert.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="panel-item border border-[var(--border-color)] rounded-md bg-[var(--bg-primary)] overflow-hidden">
        <div className="p-4 border-b border-[var(--border-color)]">
          <h2 className="text-[var(--text-muted)] tracking-[3px] uppercase text-xs">
            Detection Breakdown
          </h2>
        </div>

        <div className="p-5 space-y-5">
          {breakdownItems.length === 0 ? (
            <div className="text-sm text-[var(--text-muted)]">No detection alerts received yet.</div>
          ) : (
            breakdownItems.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2 text-sm">
                  <span>{item.label}</span>
                  <span className="text-[var(--text-muted)]">{item.value}</span>
                </div>
                <div className="h-2 bg-black rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${Math.min(100, item.value * 10)}%`,
                      background: item.color
                    }}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="panel-item border border-[var(--border-color)] rounded-md bg-[var(--bg-primary)] overflow-hidden">
        <div className="p-4 border-b border-[var(--border-color)]">
          <h2 className="text-[var(--text-muted)] tracking-[3px] uppercase text-xs">
            Alerts / Minute
          </h2>
        </div>

        <div className="h-40 flex items-end gap-2 p-5">
          {recentMinutes.map((item, index) => (
            <div
              key={index}
              className="flex-1 rounded-t-sm"
              style={{
                height: `${Math.max(10, item.count * 14)}px`,
                background:
                  item.count > 3
                    ? "var(--danger)"
                    : item.count > 1
                    ? "var(--watch)"
                    : "var(--safe)"
              }}
              title={`${item.label}: ${item.count}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
