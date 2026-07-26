import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
      alert('Please fill in all fields.');
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
      alert('Listing added successfully!');
      navigate('/home');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Campus Share</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Add a Listing</h1>
          <p className="mt-2 text-sm text-slate-600">Fill in the details to share an item with your campus.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Item Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              placeholder="Enter item name"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              placeholder="Describe the item"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
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
            <input
              type="number"
              name="rentPerDay"
              value={formData.rentPerDay}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              placeholder="e.g. 120"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Contact Number</label>
            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              placeholder="Enter contact number"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Image URL</label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              placeholder="Paste an image URL"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddListing;
