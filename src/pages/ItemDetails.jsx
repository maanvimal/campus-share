import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { deleteDoc, doc } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import { auth, db } from '../firebase/firebase';
import LoadingSpinner from '../components/LoadingSpinner';
import ConfirmationModal from '../components/ConfirmationModal';
import { getListingById } from '../services/listingService';

function ItemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copyMessage, setCopyMessage] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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
    try {
      await deleteDoc(doc(db, 'listings', id));
      toast.success('Listing deleted successfully.');
      navigate('/home');
    } catch (error) {
      toast.error(error.message || 'Failed to delete listing.');
    } finally {
      setIsDeleteModalOpen(false);
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
      toast.error(error.message || 'Unable to copy item details.');
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
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div className="mx-auto max-w-6xl rounded-[2rem] border border-slate-200 bg-white p-4 shadow-[0_20px_60px_-24px_rgba(15,23,42,0.18)] sm:p-6 lg:p-8">
        <button
          type="button"
          onClick={() => navigate('/home')}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
        >
          <span aria-hidden="true">←</span>
          Back
        </button>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-100">
            {listing.imageUrl ? (
              <img src={listing.imageUrl} alt={listing.name} className="h-[22rem] w-full object-cover sm:h-[28rem]" />
            ) : (
              <div className="flex h-[22rem] items-center justify-center text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 sm:h-[28rem]">
                No Image
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-blue-700">
                  Item Details
                </span>
                <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  ● Available
                </span>
              </div>

              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                {listing.name}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                  {listing.category}
                </span>
              </div>

              <div className="mt-5 rounded-[1.25rem] border border-blue-100 bg-blue-50/70 p-4">
                <p className="text-sm font-medium text-blue-700">Rent per day</p>
                <p className="mt-1 text-2xl font-semibold text-slate-900">₹{listing.rentPerDay}</p>
              </div>

              <div className="mt-5">
                <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Description</h2>
                <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-base">
                  {listing.description}
                </p>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Contact</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">{listing.contactNumber}</p>
                </div>
                <div className="rounded-full bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm">
                  Quick contact
                </div>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Owner information</p>
              <div className="mt-4 space-y-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Owner name</p>
                  <p className="mt-1 font-semibold text-slate-900">{listing.ownerName || 'User'}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Owner email</p>
                  <p className="mt-1 font-semibold text-slate-900">{listing.ownerEmail || 'Not available'}</p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2.5">
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
                  onClick={() => setIsDeleteModalOpen(true)}
                  className="mt-4 rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                >
                  Delete Listing
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        title="Delete Listing?"
        message="This action cannot be undone."
        onCancel={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}

export default ItemDetails;
