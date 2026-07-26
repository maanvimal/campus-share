import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ItemCard({ item }) {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  const hasImage = Boolean(item?.imageUrl) && !imageError;
  const rentLabel = item?.rentPerDay ? `₹${item.rentPerDay}/day` : 'Contact';
  const descriptionPreview = item?.description?.trim() || 'A useful item ready to borrow from your campus community.';

  return (
    <article className="card-surface flex h-full flex-col overflow-hidden">
      <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-slate-100 via-white to-blue-50">
        {hasImage ? (
          <img
            src={item.imageUrl}
            alt={item?.name || 'Listing image'}
            className="h-full w-full object-cover transition duration-300 hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              No Image
            </span>
          </div>
        )}
        <div className="absolute left-3 top-3 rounded-full border border-emerald-200 bg-white/90 px-3 py-1 text-xs font-semibold text-emerald-700 shadow-sm">
          ● Available
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-lg font-semibold tracking-tight text-slate-900">{item?.name}</h3>
            <div className="mt-2 inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
              {item?.category}
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50/80 p-3">
          <p className="text-sm font-semibold text-blue-700">{rentLabel}</p>
          <p className="mt-2 line-clamp-2 text-sm text-slate-600">{descriptionPreview}</p>
        </div>

        <button
          type="button"
          onClick={() => navigate(`/item/${item.id}`)}
          className="btn-primary mt-5 inline-flex w-full items-center justify-center gap-2"
        >
          <span>View Details</span>
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14" />
            <path d="m13 6 6 6-6 6" />
          </svg>
        </button>
      </div>
    </article>
  );
}

export default ItemCard;
