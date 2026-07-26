function SkeletonCard() {
  return (
    <article className="card-surface flex h-full flex-col overflow-hidden" aria-hidden="true">
      <div className="relative h-48 w-full overflow-hidden bg-slate-200 animate-pulse">
        <div className="absolute left-3 top-3 h-7 w-20 rounded-full bg-slate-300" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="w-full min-w-0">
            <div className="h-5 w-3/4 rounded-full bg-slate-200 animate-pulse" />
            <div className="mt-2 h-6 w-24 rounded-full bg-slate-200 animate-pulse" />
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50/80 p-3">
          <div className="h-4 w-24 rounded-full bg-slate-200 animate-pulse" />
          <div className="mt-2 h-4 w-full rounded-full bg-slate-200 animate-pulse" />
          <div className="mt-2 h-4 w-4/5 rounded-full bg-slate-200 animate-pulse" />
        </div>

        <div className="mt-5 h-11 w-full rounded-full bg-slate-200 animate-pulse" />
      </div>
    </article>
  );
}

export default SkeletonCard;
