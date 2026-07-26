import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import ItemCard from '../components/ItemCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { getAllListings } from '../services/listingService';

function MyListings() {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <main className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Campus Share</p>
              <h1 className="mt-2 text-3xl font-bold text-slate-900">My Listings</h1>
            </div>
          </div>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : listings.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-8 py-14 text-center shadow-sm">
            <p className="text-2xl font-semibold text-slate-900">📦 My Listings</p>
            <p className="mt-3 text-sm text-slate-500">You haven't listed any items yet.</p>
            <button
              type="button"
              onClick={() => navigate('/add')}
              className="mt-6 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Add Your First Listing
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {listings.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default MyListings;
