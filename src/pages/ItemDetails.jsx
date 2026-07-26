import { useEffect, useState } from 'react';
import { deleteDoc, doc } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import { auth, db } from '../firebase/firebase';
import LoadingSpinner from '../components/LoadingSpinner';
import { getListingById } from '../services/listingService';

function ItemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copyMessage, setCopyMessage] = useState('');

  useEffect(() => {
    async function loadListing() {
      try {
        const data = await getListingById(id);
        setListing(data);
      } catch (error) {
        console.error('Failed to fetch listing:', error);
      } finally {
        setLoading(false);
      }
    }

    loadListing();
  }, [id]);

  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this listing?');

    if (!confirmed) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'listings', id));
      alert('Listing deleted successfully.');
      navigate('/home');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleCopy = async (value, successMessage) => {
    if (!value) {
      return;
    }

    try {
      await navigator.clipboard.writeText(value);
      setCopyMessage(successMessage);
      setTimeout(() => setCopyMessage(''), 1500);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleWhatsApp = () => {
    if (!listing?.contactNumber) {
      return;
    }

    const phone = listing.contactNumber.replace(/\D/g, '');
    const url = `https://wa.me/91${phone}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!listing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-900">Listing not found.</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <button
          type="button"
          onClick={() => navigate('/home')}
          className="mb-6 rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
        >
          ← Back
        </button>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-100">
            {listing.imageUrl ? (
              <img src={listing.imageUrl} alt={listing.name} className="h-80 w-full object-cover" />
            ) : (
              <div className="flex h-80 items-center justify-center text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                No Image
              </div>
            )}
          </div>

          <div className="space-y-5">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Item Details</p>
              <h1 className="mt-2 text-3xl font-bold text-slate-900">{listing.name}</h1>
              <p className="mt-3 text-slate-600">{listing.description}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Category</p>
                <p className="mt-1 font-semibold text-slate-900">{listing.category}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Rent Per Day</p>
                <p className="mt-1 font-semibold text-slate-900">{listing.rentPerDay}</p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="text-sm text-slate-500">Contact Number</p>
              <p className="mt-1 text-lg font-semibold text-slate-900">{listing.contactNumber}</p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Owner Information</p>
              <div className="mt-3 space-y-2">
                <div>
                  <p className="text-sm text-slate-500">Owner Name</p>
                  <p className="font-semibold text-slate-900">{listing.ownerName || 'User'}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Owner Email</p>
                  <p className="font-semibold text-slate-900">{listing.ownerEmail || 'Not available'}</p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => handleCopy(listing.ownerEmail, 'Email copied!')}
                  className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  📋 Copy Email
                </button>

                <button
                  type="button"
                  onClick={() => handleCopy(listing.contactNumber, 'Phone number copied!')}
                  className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  📋 Copy Phone
                </button>

                <button
                  type="button"
                  onClick={handleWhatsApp}
                  disabled={!listing.contactNumber}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    listing.contactNumber
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                      : 'cursor-not-allowed bg-slate-300 text-slate-600'
                  }`}
                >
                  💬 WhatsApp Owner
                </button>
              </div>

              {copyMessage && <p className="mt-3 text-sm font-medium text-blue-600">{copyMessage}</p>}

              {auth.currentUser?.uid === listing.ownerId && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="mt-3 rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                >
                  Delete Listing
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetails;
