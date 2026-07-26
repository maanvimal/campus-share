import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export async function getAllListings() {
  const listingsCollection = collection(db, 'listings');
  const snapshot = await getDocs(listingsCollection);

  return snapshot.docs.map((docItem) => ({
    id: docItem.id,
    ...docItem.data(),
  }));
}

export async function getListingById(id) {
  const listingRef = doc(db, 'listings', id);
  const snapshot = await getDoc(listingRef);

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
}
