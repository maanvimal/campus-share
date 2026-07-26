import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import ItemCard from '../components/ItemCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { getAllListings } from '../services/listingService';

const categories = ['All', 'Books', 'Electronics', 'Sports', 'Others'];

function Home() {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    async function loadListings() {
      try {
        const data = await getAllListings();
        setListings(data);
      } catch (error) {
        console.error('Failed to fetch listings:', error);
      } finally {
        setLoading(false);
      }
    }

    loadListings();
  }, []);

  const filteredListings = listings.filter((item) => {
    const query = searchTerm.toLowerCase();
    const name = item?.name?.toLowerCase() || '';
    const category = item?.category?.toLowerCase() || '';
    const matchesSearch = name.includes(query) || category.includes(query);
    const matchesCategory = selectedCategory === 'All' || category === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
        <section className="relative overflow-hidden rounded-[2rem] border border-blue-100 bg-gradient-to-br from-blue-600 via-blue-500 to-emerald-400 p-4 shadow-[0_24px_80px_-24px_rgba(37,99,235,0.45)] sm:p-6 lg:p-7">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.28),_transparent_38%)]" />

          <div className="relative grid gap-4 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-3 py-1 text-sm font-medium text-white/90 backdrop-blur">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-xs">↺</span>
                Campus marketplace
              </div>

              <h1 className="mt-3 text-2.5xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
                Welcome back, find what your campus has to share.
              </h1>
              <p className="mt-2 max-w-xl text-sm text-blue-50 sm:text-base">
                Borrow, rent and share items across your campus.
              </p>

              <div className="mt-4 rounded-[1.25rem] border border-white/30 bg-white/90 p-2.5 shadow-lg backdrop-blur">
                <SearchBar value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
              </div>
            </div>

            <div className="rounded-[1.25rem] border border-white/30 bg-white/15 p-3.5 text-white shadow-lg backdrop-blur-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-blue-100">Why it works</p>
              <div className="mt-2 space-y-2">
                <div className="rounded-2xl bg-white/20 p-2.5">
                  <p className="text-sm font-semibold">Fast discovery</p>
                  <p className="mt-0.5 text-sm text-blue-50">Search by name or category in seconds.</p>
                </div>
                <div className="rounded-2xl bg-white/20 p-2.5">
                  <p className="text-sm font-semibold">Trusted campus sharing</p>
                  <p className="mt-0.5 text-sm text-blue-50">Simple listings built for everyday needs.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative mt-4 flex flex-wrap gap-2">
            {categories.map((category) => {
              const isSelected = selectedCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    isSelected
                      ? 'border-white bg-white text-blue-700 shadow-sm'
                      : 'border-white/40 bg-white/15 text-white hover:border-white/70 hover:bg-white/25'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white/80 p-4 shadow-sm sm:p-6 lg:p-7">
          <div className="mb-5 flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-slate-600">
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 7h16" />
                  <path d="M7 3v4" />
                  <path d="M17 3v4" />
                  <path d="M5 7h14l-1 13H6L5 7Z" />
                </svg>
                Available items
              </div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-2.5xl">
                Browse what is available right now
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Fresh listings from your campus community.
              </p>
            </div>

            <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-600">
              {filteredListings.length} visible
            </div>
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : listings.length === 0 ? (
            <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50 px-8 py-14 text-center shadow-sm">
              <p className="text-lg font-semibold text-slate-900">No items available yet.</p>
              <p className="mt-2 text-sm text-slate-500">Be the first to add a listing to your campus marketplace.</p>
            </div>
          ) : filteredListings.length === 0 ? (
            <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50 px-8 py-14 text-center shadow-sm">
              <p className="text-lg font-semibold text-slate-900">No matching items found.</p>
              <p className="mt-2 text-sm text-slate-500">Try a different keyword or category.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {filteredListings.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </section>
      </main>

      <button
        type="button"
        onClick={() => navigate('/add')}
        className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-3xl font-semibold text-white shadow-lg transition hover:bg-blue-700"
        aria-label="Add listing"
      >
        +
      </button>

      <footer className="border-t border-slate-200 bg-white/80 px-4 py-6 text-center text-sm text-slate-500 sm:px-6 lg:px-8">
        Campus Share © 2026
      </footer>
    </div>
  );
}

export default Home;
