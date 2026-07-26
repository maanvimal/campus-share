import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import ItemCard from '../components/ItemCard';
import SkeletonCard from '../components/SkeletonCard';
import { getAllListings } from '../services/listingService';

function MyListings() {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const totalListings = listings.length;
  const categoriesCount = new Set(listings.map((item) => item.category)).size;
  const availableCount = listings.filter((item) => item?.rentPerDay !== undefined && item?.rentPerDay !== null).length;

  useEffect(() => {
    async function loadListings() {
      try {
        const data = await getAllListings();
        const filtered = data.filter((item) => item.ownerId === auth.currentUser?.uid);
        setListings(filtered);
      } catch (error) {
        console.error('Failed to fetch listings:', error);
      } finally {
        setLoading(false);
      }
    }

    loadListings();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_20px_60px_-24px_rgba(15,23,42,0.16)] sm:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Campus Share</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">My Listings</h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">
                Manage everything you've shared with your campus.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate('/add')}
              className="inline-flex items-center justify-center rounded-full bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(37,99,235,0.2)] transition hover:bg-blue-700"
            >
              + Add Listing
            </button>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-medium text-slate-500">Total Listings</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{totalListings}</p>
            </div>
            <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-medium text-slate-500">Categories</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{categoriesCount}</p>
            </div>
            <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-medium text-slate-500">Available</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{availableCount}</p>
            </div>
          </div>
        </section>

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : listings.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white px-8 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600">
              <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M4 7h16" />
                <path d="M7 3v4" />
                <path d="M17 3v4" />
                <path d="M5 7h14l-1 13H6L5 7Z" />
              </svg>
            </div>
            <p className="mt-5 text-2xl font-semibold text-slate-900">No listings yet</p>
            <p className="mt-2 text-sm text-slate-500 sm:text-base">Share your first item and it will appear here.</p>
            <button
              type="button"
              onClick={() => navigate('/add')}
              className="mt-6 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Add Your First Listing
            </button>
          </div>
        ) : (
          <section className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm sm:p-6 lg:p-7">
            <div className="mb-5 flex flex-col gap-2 border-b border-slate-200 pb-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Your collection</p>
                <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">Shared items</h2>
              </div>
              <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-600">
                {listings.length} active
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {listings.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default MyListings;
