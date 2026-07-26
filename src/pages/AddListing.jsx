import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';

const categories = ['Books', 'Electronics', 'Sports', 'Others'];

function AddListing() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    rentPerDay: '',
    contactNumber: '',
    imageUrl: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { name, description, category, rentPerDay, contactNumber, imageUrl } = formData;

    if (!name || !description || !category || !rentPerDay || !contactNumber || !imageUrl) {
      toast.error('Please fill in all fields.');
      return;
    }

    try {
      const currentUser = auth.currentUser;

      await addDoc(collection(db, 'listings'), {
        name,
        description,
        category,
        rentPerDay: Number(rentPerDay),
        contactNumber,
        imageUrl,
        ownerId: currentUser?.uid || '',
        ownerName: currentUser?.displayName || 'User',
        ownerEmail: currentUser?.email || '',
      });
      toast.success('Listing added successfully!');
      navigate('/home');
    } catch (error) {
      toast.error(error.message || 'Failed to add listing.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-slate-200 bg-white p-4 shadow-[0_20px_60px_-24px_rgba(15,23,42,0.18)] sm:p-6 lg:p-8">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Campus Share</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Create Listing</h1>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">Share an item with your campus in a few simple steps.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <section className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 shadow-sm sm:p-5">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-slate-900">Photos</h2>
              <p className="mt-1 text-sm text-slate-600">Upload a clear photo of your item.</p>
            </div>

            {formData.imageUrl ? (
              <div className="overflow-hidden rounded-[1.25rem] border border-slate-200 bg-white">
                <img src={formData.imageUrl} alt="Preview" className="h-56 w-full object-cover sm:h-64" />
              </div>
            ) : (
              <label className="flex cursor-pointer flex-col items-center justify-center rounded-[1.25rem] border border-dashed border-slate-300 bg-white px-6 py-10 text-center transition hover:border-blue-400 hover:bg-blue-50/40">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 16V4" />
                    <path d="m8 8 4-4 4 4" />
                    <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
                  </svg>
                </div>
                <p className="mt-4 text-base font-semibold text-slate-800">Add a photo</p>
                <p className="mt-1 text-sm text-slate-500">Upload a clear photo of your item.</p>
              </label>
            )}

            <div className="mt-4">
              <label className="mb-2 block text-sm font-medium text-slate-700">Image URL</label>
              <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                placeholder="Paste an image URL"
              />
            </div>
          </section>

          <section className="rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-slate-900">Item Details</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">Item Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  placeholder="Enter item name"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Rent Per Day</label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">₹</span>
                  <input
                    type="number"
                    name="rentPerDay"
                    value={formData.rentPerDay}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-300 bg-white py-3 pl-8 pr-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    placeholder="e.g. 120"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  placeholder="Describe the item"
                />
              </div>
            </div>
          </section>

          <section className="rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-slate-900">Contact</h2>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Contact Number</label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L13 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
                  </svg>
                </span>
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  placeholder="Enter contact number"
                />
              </div>
            </div>
          </section>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-[1.25rem] bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(37,99,235,0.24)] transition hover:translate-y-[-1px] hover:shadow-[0_16px_36px_rgba(37,99,235,0.28)]"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14" />
              <path d="m5 12 7 7 7-7" />
            </svg>
            Publish Listing
          </button>

          <div className="rounded-[1.25rem] border border-emerald-100 bg-emerald-50/70 p-4">
            <p className="text-sm font-semibold text-emerald-800">Tips for better listings</p>
            <ul className="mt-2 space-y-1 text-sm text-emerald-700">
              <li>• Upload a clear image.</li>
              <li>• Add an honest description.</li>
              <li>• Set a fair rental price.</li>
            </ul>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddListing;
