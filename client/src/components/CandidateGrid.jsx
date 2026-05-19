import CandidateCard from "./CandidateCard";

export default function CandidateGrid({
  candidates
}) {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-5">

      {candidates.length === 0 ? (
        <div className="col-span-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-10 text-center text-[var(--text-muted)]">
          No candidates match this filter yet.
        </div>
      ) : (
        candidates.map((candidate, index) => (
          <CandidateCard
            key={candidate._id}
            data={candidate}
            index={index}
          />
        ))
      )}

    </div>
  );
}