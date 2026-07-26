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

      <main className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <SearchBar value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />

          <div className="mt-4 flex flex-wrap gap-3">
            {categories.map((category) => {
              const isSelected = selectedCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                    isSelected
                      ? 'border-blue-600 bg-blue-600 text-white'
                      : 'border-slate-200 text-slate-700 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-slate-900">Available Items</h2>
            <p className="text-sm text-slate-500">Live listings</p>
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : listings.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-8 py-14 text-center shadow-sm">
              <p className="text-lg font-semibold text-slate-900">No items available yet.</p>
              <p className="mt-2 text-sm text-slate-500">Be the first to add a listing to your campus marketplace.</p>
            </div>
          ) : filteredListings.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-8 py-14 text-center shadow-sm">
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
