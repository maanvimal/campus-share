import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ItemCard({ item }) {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  const hasImage = Boolean(item?.imageUrl) && !imageError;
  const rentLabel = item?.rentPerDay ? `₹${item.rentPerDay}/day` : 'Contact';

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="h-40 w-full bg-gradient-to-br from-slate-100 to-slate-200">
        {hasImage ? (
          <img
            src={item.imageUrl}
            alt={item?.name || 'Listing image'}
            className="h-full w-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              No Image
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-lg font-semibold text-slate-900">{item?.name}</h3>
            <p className="mt-1 text-sm text-slate-500">{item?.category}</p>
          </div>
          <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
            {rentLabel}
          </span>
        </div>

        <button
          type="button"
          onClick={() => navigate(`/item/${item.id}`)}
          className="mt-4 w-full rounded-2xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          View Details
        </button>
      </div>
    </article>
  );
}

export default ItemCard;
